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

    );

module.exports = router;
