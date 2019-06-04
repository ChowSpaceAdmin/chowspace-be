const express = require('express');
const Authentication = require('../middlewares/Authentication');
const ReservationService = require('../services/Reservation');

const router = express();

router.post('/api/reservation', 

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            const payload = req.body;
            payload.user = req.user;
            const response = await ReservationService.createReservation(payload);
            res.send(response);
        } catch(err) {
            next(err);
        }
    }
);

module.exports = router;
