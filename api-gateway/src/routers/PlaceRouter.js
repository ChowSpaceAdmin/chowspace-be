const express = require('express');
const Authentication = require('../middlewares/Authentication');
const Parser = require('../middlewares/Parser');
const PlaceService = require('../services/Place');
const AuthenticationService = require('../services/Authentication');

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
                
                response.places.forEach(place => place.rating = 3);    
                
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
                "rating": 3,
                "reviews": [
                    {
                        "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                        "title": "Mock Data",
                        "description": "Very Good Mock Data",
                        "rating": 5,
                        "by": {
                            "id": "199c4998-394a-4c95-89f2-76df97b6af15",
                            "name": "Mock Data",
                            "image": "https://content-static.upwork.com/uploads/2014/10/01073427/profilephoto1.jpg",
                            "telephones": ["089-041-6252", "029340143222"]
                        }
                    }
            ],
            };
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
