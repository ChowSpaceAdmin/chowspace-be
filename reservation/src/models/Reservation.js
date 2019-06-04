const Sequelize = require('sequelize');
const sequelize = require('../server/database');
const ReservationValidator = require('../services/ReservationValidator');
const ReservationValidationError = require('../errors/ReservationValidationError');

const Op = Sequelize.Op;

class Reservation extends Sequelize.Model {

    static get PENDING() { return 'PENDING'; }
    static get ACCEPTED() { return 'ACCEPTED'; }

    static async createObject(user, space, type, from, till) {

        const place = await ReservationValidator.validate(user, space, type, from ,till);

        const renting = place.spaces.find(s => s.id == space);
        let prices = renting.prices.filter(price => price.type == type.toUpperCase());

        const fromDateTime = new Date(from.year, from.month - 1, from.day, from.hour);
        const tillDateTime = new Date(till.year, till.month - 1, till.day, till.hour);

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

        // TO DO check space count


        const reservation = await this.create({
            space: renting.id,
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

    getInfo() {
        return {
            id: this.id,
            space: this.space,
            user: this.user,
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
