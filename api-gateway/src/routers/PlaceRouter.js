const express = require('express');
const Authentication = require('../middlewares/Authentication');
const Parser = require('../middlewares/Parser');
const PlaceService = require('../services/Place');
const AuthenticationService = require('../services/Authentication');
const ReviewService = require('../services/Review');

const router = express.Router();

router.route('/api/place')
    .post(

        Authentication.authenticate,
        Parser.convertToFormData(),

        async (req, res, next) => {
            try {
                const response = await PlaceService.createPlace(req.form);
                const details = {
                    place: response.place,
                    rating: 0,
                    reviews: [],
                };
                const user = await AuthenticationService.getProfile(details.place.user);
                details.place.user = user.profile;

                res.send(details);
            } catch(err) {
                next(err);
            }
        }
    )
    .get(async (req, res, next) => {
            try {
                const response = await PlaceService.searchPlace(req.query.name, 
                    req.query.location, req.query.isVerified, req.query.keywords);
                
                let ids = [];
                response.places.forEach(place => ids.push(place.id));
                const stats = await ReviewService.getStatistics(ids);

                response.places.forEach(place => place.rating = stats.statistics[place.id].average);
                
                res.send(response);
            } catch(err) {
                next(err);
            }
    });

router.route('/api/place/:id')
    .get(async (req, res, next) => {
        try {
            const id = req.params.id;
            const response = await PlaceService.getPlaceDetail(id);
            const details = {
                place: response.place,
            };

            const stats = await ReviewService.getStatistics([id]);
            let stat = stats.statistics[id];

            details.rating = stat.average;
            details.total = stat.total;

            const reviews = await ReviewService.getReview(null, id, null, null);

            for (let i = 0; i < reviews.reviews.length; i++) {
                let profile = await AuthenticationService.getProfile(reviews.reviews[i].user);
                reviews.reviews[i].user = profile.profile;
            }
            details.reviews = reviews.reviews;

            const user = await AuthenticationService.getProfile(details.place.user);
            details.place.user = user.profile;

            res.send(details);
        } catch(err) {
            next(err);
        }
    });

router.get('/api/owner/place',

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            const response = await PlaceService.getOwnerPlace(req.user);

            const ids = [];
            response.places.forEach(place => ids.push(place.id));

            const stats = await ReviewService.getStatistics(ids);
            response.places.forEach(place => {
                let stat = stats.statistics[place.id];
                place.rating = stat.average;
                place.total = stat.total;
                place.new = stat.new;

                place.spaces.forEach(space => {
                    space.reservation = {
                        total: 55,
                        new: 33
                    };
                });
            });

            const date = new Date();
            let reservation = {
                month: date.getMonth() + 1,
                year: date.getFullYear()
            };
            for(let i = 1; i < 31; i++) {
                reservation[i] = Math.round(Math.random() * 100);
            }
            response.reservation = reservation;

            res.send(response);
        } catch(err) {
            next(err);
        }
});

router.get('/api/location', async (req, res, next) => {
    try {
        const response = await PlaceService.getLocations();
        res.send(response);
    } catch(err) {
        next(err);
    }
});

router.post('/api/place/document', 

    Authentication.authenticate,
    Parser.convertToFormData(),

    async (req, res, next) => {
        try {
            const response = await PlaceService.uploadDocuments(req.form);
            res.send(response);
        } catch(err) {
            next(err);
        }
});

router.route('/api/place/document/:id')
    .delete(

        Authentication.authenticate,

        async (req, res, next) => {
            try {
                const id = req.params.id;
                const response = await PlaceService.deleteDocument(id, req.user);
                res.send(response);
            } catch(err) {
                next(err);
            }
        }
    );

router.post('/api/place/verify',

        Authentication.authenticate,

        async (req, res, next) => {
            try {
                const payload = req.body;
                payload.user = req.user;
                const response = await PlaceService.verifyPlace(payload);
                res.send(response);
            } catch(err) {
                next(err);
            }
        }
);

router.post('/api/place/documents',

        Authentication.authenticate,

        async (req, res, next) => {
            try {
                const payload = req.body;
                payload.user = req.user;
                const response = await PlaceService.getDocuments(payload);
                res.send(response);
            } catch(err) {
                next(err);
            }
        }
);

module.exports = router;
