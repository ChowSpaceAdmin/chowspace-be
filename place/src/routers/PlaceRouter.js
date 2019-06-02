const express = require('express');
const _ = require('lodash');
const Parser = require('../middlewares/Parser');
const Permission = require('../middlewares/Permission');
const Place = require('../models/Place');
const QueryConverter = require('../services/QueryConverter');

const router = express.Router();

router.route('/place')
    .post(

        Parser.parseFormData({
            'user': Parser.JSON_DATA,
            'telephones': Parser.JSON_DATA,
            'keywords': Parser.JSON_DATA,
            'openTimes': Parser.JSON_DATA
        }),
        Permission.activeAccount,

        async (req, res, next) => {
            try {
                const payload = _.pick(req.body, ['user', 'name', 'description', 'address', 'location',
                    'longitude', 'latitude', 'showcaseImage','telephones', 'keywords', 'openTimes']);
                const bufferFiles = req.files.filter(file => file.fieldname == 'images');

                const place = await Place.createObject(payload.user, payload.name, payload.description, 
                    payload.address, payload.location, payload.longitude, payload.latitude, 
                    payload.showcaseImage, bufferFiles, payload.telephones, payload.keywords, payload.openTimes);

                const info = await place.getInfo();
                
                res.send({
                    place: info
                });
            } catch(err) {
                next(err);
            }
        }

    )
    .get(async (req, res, next) => {
        try {
            if (req.query.isVerified) { 
                req.query.isVerified = QueryConverter.convert(req.query.isVerified, QueryConverter.BOOLEAN);
            }
            if (req.query.ids) {
                req.query.ids = QueryConverter.convert(req.query.ids, QueryConverter.ARRAY);
            }
            if (req.query.keywords) {
                req.query.keywords = QueryConverter.convert(req.query.keywords, QueryConverter.ARRAY);
            }

            const places = await Place.findObject(req.query.name, req.query.location, req.query.isVerified,
                req.query.ids, req.query.keywords, req.query.space);
            const infos = [];

            for(let i = 0; i < places.length; i++) {
                let info = await places[i].getInfo();
                infos.push(info);
            }
            
            res.send({
                places: infos
            });
        } catch(err) {
            next(err);
        }
    });

router.route('/place/:id')
    .get(async (req, res, next) => {
        try {
            const id = req.params.id;
            const place = await Place.findByObjectId(id);
            const info = await place.getInfo();

            res.send({
                place: info
            });
        } catch(err) {
            next(err);
        }
    });

router.post('/place/owner',

    Permission.activeAccount,

    async (req, res, next) => {
        try {
            const places = await Place.findByUser(req.body.user.id);
            const infos = [];

            for(let i = 0; i < places.length; i++) {
                const info = await places[i].getInfoOwner();
                infos.push(info);
            }

            res.send({
                places: infos
            });
        } catch(err) {
            next(err);
        }
    }
);

router.get('/location', async (req, res, next) => {
    try {
        const locations = await Place.getLocations();

        res.send({
            locations
        });
    } catch(err) {
        next(err);
    }
});

router.route('/place/document')
    .post(

        Parser.parseFormData({
            'user': Parser.JSON_DATA
        }),
        Permission.activeAccount,

        async (req, res, next) => {
            try {
                const payload = _.pick(req.body, ['user', 'place']);
                const bufferFiles = req.files.filter(file => file.fieldname == 'images');

                const place = await Place.findByObjectId(payload.place);
                const documents = await place.addDocuments(bufferFiles, payload.user);

                res.send(documents);
            } catch(err) {
                next(err);
            }
        }

    );

router.route('/place/document/:id')
    .post(

        Permission.activeAccount,

        async (req, res, next) => {
            try {
                const id = req.params.id;
                const payload = _.pick(req.body, ['user']);

                const place = await Place.findByDocumentId(id);
                const response = await place.getDocument(id, payload.user);

                const headers = ['content-type'];
                headers.forEach(header => res.set(header, response.headers[header]));
                res.send(response.data);
            } catch(err) {
                next(err);
            }
        }

    )
    .delete(

        Permission.activeAccount,

        async (req, res, next) => {
            try {
                const id = req.params.id;
                const payload = _.pick(req.body, ['user']);

                const place = await Place.findByDocumentId(id);
                const success = await place.deleteDocument(id, payload.user);

                res.send({success});
            } catch(err) {
                next(err);
            }
        }

    );

router.post('/place/verify', 
    
    Permission.adminAccount,
    
    async (req, res, next) => {
        try {
            const payload = _.pick(req.body, ['user', 'place', 'isVerified']);

            const place = await Place.findByObjectId(payload.place);
            const success = await place.setVerified(payload.isVerified);

            res.send({success});
        } catch(err) {
            next(err);
        }
    }
);

module.exports = router;
