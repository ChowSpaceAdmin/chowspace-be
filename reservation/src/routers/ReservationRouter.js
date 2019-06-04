const express = require('express');
const _ = require('lodash');
const Permission = require('../middlewares/Permission');
const Reservation = require('../models/Reservation');

const router = express.Router();

router.route('/reservation')
    .post(

        Permission.activeAccount,

        async (req, res, next) => {
            try {
                
                const payload = _.pick(req.body, ['user', 'space', 'type', 'from', 'till']);

                const reservation = await Reservation.createObject(payload.user, payload.space, 
                    payload.type, payload.from, payload.till);

                res.send(reservation.getInfo());
            } catch(err) {
                next(err);
            }
        }
    )
    .get(
        async (req, res, next) => {
            try {
                const reservations = await Reservation.findObject(req.query.space, req.query.place, req.query.renter,
                    req.query.owner, req.query.status, req.query.type, req.query.id, req.query.day, req.query.month, req.query.year);

                const result = [];
                reservations.forEach(reservation => result.push(reservation.getInfo()));
                
                res.send({
                    reservations: result
                });
            } catch(err) {
                next(err);
            }
        }
    );

router.post('/reservation/:id',

    Permission.activeAccount,

    async (req, res, next) => {
        try {
            const id = req.params.id;
            const payload = _.pick(req.body, ['user', 'confirm']);

            const reservation = await Reservation.findByObjectId(id);

            await reservation.setStatus(payload.user, payload.confirm);

            res.send(reservation.getInfo());
        } catch(err) {
            next(err);
        }
    }
);

module.exports = router;
