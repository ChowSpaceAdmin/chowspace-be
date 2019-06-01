const express = require('express');
const _ = require('lodash');
const Parser = require('../middlewares/Parser');
const Permission = require('../middlewares/Permission');
const Space = require('../models/Space');

const router = express.Router();

router.route('/space')
    .post(

        Parser.parseFormData({
            'user': Parser.JSON_DATA,
            'keywords': Parser.JSON_DATA,
            'prices': Parser.JSON_DATA
        }),
        Permission.activeAccount,

        async (req, res, next) => {
            try {
                const payload = _.pick(req.body, ['user', 'place', 'name', 'description', 
                    'dimension', 'capacity', 'amount', 'showcaseImage', 'keywords', 'prices']);
                const bufferFiles = req.files.filter(file => file.fieldname == 'images');

                const space = await Space.createObject(payload.user, payload.place, payload.name,
                    payload.description, payload.dimension, payload.capacity, payload.amount,
                    payload.showcaseImage, bufferFiles, payload.keywords, payload.prices);

                const info = await space.getInfo();

                res.send({
                    space: info
                });
            } catch(err) {
                next(err);
            }
        }

    );

router.route('/space/:id')
    .get(async (req, res, next) => {
        try {
            const id = req.params.id;
            const space = await Space.findByObjectId(id);
            const info = await space.getInfo();

            res.send({
                space: info
            });
        } catch(err) {
            next(err);
        }
    });

module.exports = router;
