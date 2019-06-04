const _ = require('lodash');
const Sequelize = require('sequelize');
const sequelize = require('../server/database');
const ReservationValidator = require('../services/ReservationValidator');
const ReservationValidationError = require('../errors/ReservationValidationError');
const ModelNotFoundError = require('../errors/ModelNotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

const Op = Sequelize.Op;

class Reservation extends Sequelize.Model {

    static get PENDING() { return 'PENDING'; }
    static get ACCEPTED() { return 'ACCEPTED'; }
    static get REJECTED() { return 'REJECTED'; }

    static async createObject(user, space, type, from, till) {

        // Validate space, pricing existance and if reservation can be made within that time
        const place = await ReservationValidator.validate(user, space, type, from ,till);

        const rentingSpace = place.spaces.find(s => s.id == space);
        let prices = rentingSpace.prices.filter(price => price.type == type.toUpperCase());

        const fromDateTime = new Date(from.year, from.month - 1, from.day, from.hour);
        const tillDateTime = new Date(till.year, till.month - 1, till.day, till.hour);

        // Calculate total and validate if total can be calculated
        let amount;
        if (type.toUpperCase() == 'HL') {
            amount = (tillDateTime - fromDateTime) / (1000 * 60 * 60);
        } else {
            amount = Math.ceil((tillDateTime - fromDateTime) / (1000 * 60 * 60 * 24));
        }

        prices.sort((a, b) => {
            if (a.amount > b.amount) return -1;
            if (a.amount < b.amount) return 1;
            return 0;
        });

        let total = 0;
        let leftamount = amount;
        let priceIndex = 0;
        let currentPrice = prices[priceIndex];
        while (leftamount > 0) {
            if (currentPrice.amount <= leftamount) {
                total += Math.floor(leftamount / currentPrice.amount) * currentPrice.price;
                leftamount = leftamount % currentPrice.amount;
            } else {
                priceIndex++;
                if (priceIndex >= prices.length) {
                    throw new ReservationValidationError({price: 'Can not find suitable price for selected date.'});
                }
                currentPrice = prices[priceIndex];
            }
        }

        // TO DO check space count, find overlapping


        const reservation = await this.create({
            space: rentingSpace.id,
            place: place.id,
            renter: user.id,
            owner: place.user,
            total,
            type: type.toUpperCase(),
            status: Reservation.PENDING,
            from: fromDateTime,
            till: tillDateTime
        });

        return reservation;

    }

    static async findObject(space, place, renter, owner, status, type, id, day, month, year) {
        const where = {};

        if (space) where.space = space;
        if (place) where.place = place;
        if (renter) where.renter = renter;
        if (owner) where.owner = owner;
        if (status) where.status = status.toUpperCase();
        if (type) where.type = type.toUpperCase();
        if (id) where.id = id;

        day = _.toInteger(day);
        month = _.toInteger(month);
        year = _.toInteger(year);

        if (!month) {
            month = new Date().getMonth();
        } else {
            month = (month) % 13 - 1;
        }
        if (!year) year = new Date().getFullYear();
        
        let from;
        let till;
        if (day) {
            from = new Date(year, month, day);
            till = new Date(year, month, day + 1);
        } else {
            from = new Date(year, month, 1);
            till = new Date(year, month + 1);
        }
        
        where.from = {
            [Op.between]: [from, till]
        };
        
        const result = await Reservation.findAll({where});

        return result;
    }

    static async findByObjectId(id) {
        const reservation = await this.findByPk(id);
        if (!reservation) throw new ModelNotFoundError('Reservation Not Found.');
        return reservation;
    }

    async setStatus(user, confirm) {
        
        if (this.owner != user.id) throw new AuthorizationError('Requires Place Owner.');

        if (_.isBoolean(confirm) && this.status == Reservation.PENDING) {
            if (confirm) {
                this.status = Reservation.ACCEPTED;
            } else {
                this.status = Reservation.REJECTED;
            }
            await this.save();

            // TO DO find overlapping and check amount and reject
        }

    }

    getInfo() {
        return {
            id: this.id,
            space: this.space,
            place: this.place,
            renter: this.renter,
            total: this.total,
            type: this.type,
            status: this.status,
            from: this.from,
            till: this.till
        };
    }

}

Reservation.init({
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    space: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true
    },
    place: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true
    },
    renter: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true
    },
    owner: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true
    },
    total: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        index: true
    },
    from: {
        type: Sequelize.DATE,
        allowNull: false,
        index: true
    },
    till: {
        type: Sequelize.DATE,
        allowNull: false,
        index: true
    }
}, {
    sequelize,
    modelName: 'reservation'
});

sequelize.sync()
    .then(() => {
        console.log('Done Syncing.');
    })
    .catch(err => {
        console.log('Error Syncing.');
    });

module.exports = Reservation;
