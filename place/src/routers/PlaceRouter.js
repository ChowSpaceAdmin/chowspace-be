const express = require('express');
const _ = require('lodash');
const Parser = require('../middlewares/Parser');
const Permission = require('../middlewares/Permission');
const Place = require('../models/Place');

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

    );

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

module.exports = router;
