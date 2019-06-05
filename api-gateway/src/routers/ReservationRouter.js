const express = require('express');
const _ = require('lodash');
const Authentication = require('../middlewares/Authentication');
const ReservationService = require('../services/Reservation');
const PlaceService = require('../services/Place');
const AuthenticationService = require('../services/Authentication');
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

router.get('/api/reservation',

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            let response;

            if (req.query.month || req.query.year) {
                response = await ReservationService.getReservation(null, null, req.user.id, null,
                    null, null, null, null, req.query.month, req.query.year);
            } else {
                response = await ReservationService.getReservationNoDate(null, null, req.user.id, null,
                    null, null, null, null);
            }

            for(let i = 0; i < response.reservations.length; i++) {
                let space = await PlaceService.getSpaceMiniInfo(response.reservations[i].space);

                response.reservations[i].space = _.pick(space.space, ['id', 'name', 'showcaseImage']);
                response.reservations[i].place = _.pick(space.space.place, ['id', 'name']);
            }

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

            const result = {
                reservations: []
            };

            response.reservations.forEach(reservation => {
                result.reservations.push(_.pick(reservation, ['id', 'from', 'till']));
            });

            res.send(result);
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

            let response = await PlaceService.getSpaceMiniInfo(id);

            const owner = response.space.place.user;
            if (req.user.id != owner) {
                throw new AuthorizationError('Requires Place Owner.');
            }

            response = await ReservationService.getReservation(id, null, null, owner,
                null, null, null, null, month, year);

            for(let i = 0; i < response.reservations.length; i++) {
                let user = await AuthenticationService.getProfile(response.reservations[i].renter);
                response.reservations[i].renter = user.profile;
            }

            res.send(response);
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

router.get('/api/reservation/:id',

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            const id = req.params.id;

            let response;
            response = await ReservationService.getReservationNoDate(null, null, 
                null, null, null, null, id);

            const reservation = response.reservations[0];

            if (reservation.owner != req.user.id && reservation.renter != req.user.id) {
                throw new AuthorizationError('Requires Place Owner or Renter.');
            }

            response = await PlaceService.getSpaceMiniInfo(reservation.space);
            reservation.space = _.pick(response.space, ['id', 'name', 'dimension', 'capacity', 'showcaseImage']);
            reservation.place = _.pick(response.space.place, ['id', 'name', 'address', 'telephones', 'showcaseImage']);

            response = await AuthenticationService.getProfile(reservation.renter);
            reservation.renter = response.profile;

            response = await AuthenticationService.getProfile(reservation.owner);
            reservation.owner = response.profile;

            res.send({
                reservation
            });
        } catch(err) {
            next(err);
        }
    }

);

module.exports = router;
