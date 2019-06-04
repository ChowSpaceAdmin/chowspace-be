const express = require('express');
const Authentication = require('../middlewares/Authentication');
const ReservationService = require('../services/Reservation');
const PlaceService = require('../services/Place');
const AuthorizationError = require('../errors/AuthorizationError');

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

router.get('/api/calendar/renter/:id', 

    async (req, res, next) => {
        try {
            const id = req.params.id;
            const month = req.query.month;
            const year = req.query.year;

            const response = await ReservationService.getReservation(id, null, null, null, 
                'accepted', null, null, null, month, year);

            res.send(response);
        } catch(err) {
            next(err);
        }
    }
);

router.get('/api/calendar/owner/:id', 

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            const id = req.params.id;
            const month = req.query.month;
            const year = req.query.year;

            const response = await PlaceService.getSpaceMiniInfo(id);

            const owner = response.space.place.user;
            if (req.user.id != owner) {
                throw new AuthorizationError('Requires Place Owner.');
            }

            const reservation = await ReservationService.getReservation(id, null, null, owner,
                null, null, null, null, month, year);

            res.send(reservation);
        } catch(err) {
            next(err);
        }
    }
);

router.post('/api/reservation/:id',

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            const id = req.params.id;
            const payload = req.body;
            payload.user = req.user;

            const response = await ReservationService.confirmReservation(id, payload);

            res.send(response);
        } catch(err) {
            next(err);
        }
    }

);

module.exports = router;
