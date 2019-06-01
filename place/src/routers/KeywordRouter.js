const express = require('express');
const _ = require('lodash');
const Keyword = require('../models/Keyword');
const Parser = require('../middlewares/Parser');
const Permission = require('../middlewares/Permission');

const router = express.Router();

router.route('/keyword')
    .post(
        Parser.parseFormData({
            'user': Parser.JSON_DATA
        }),
        Permission.adminAccount,

        async (req, res, next) => {
            try {
                const payload = _.pick(req.body, ['name', 'type']);
                const bufferFile = req.files.find(file => file.fieldname == 'icon');

                const keyword = await Keyword.createObject(payload.name, payload.type, bufferFile);

                res.send({
                    keyword: keyword.getInfo()
                });
            } catch(err) {
                next(err);
            }
        }
    )
    .get(async (req, res, next) => {
        try {
            const result = await Keyword.findObject(req.query.type);

            const keywords = [];
            result.forEach(keyword => {
                keywords.push(keyword.getInfo());
            });

            res.send({
                keywords
            });
        } catch(err) {
            next(err);
        }
    });

router.route('/keyword/:id')
    .patch(

        Parser.parseFormData({
            'user': Parser.JSON_DATA
        }),
        Permission.adminAccount,

        async (req, res, next) => {
            try {
                const id = req.params.id;                
                const payload = _.pick(req.body, ['name', 'type']);
                const bufferFile = req.files.find(file => file.fieldname == 'icon');

                const keyword = await Keyword.findByObjectId(id);
                await keyword.updateObject(payload.name, payload.type, bufferFile);

                res.send({
                    keyword: keyword.getInfo()
                });
            } catch(err) {
                next(err);
            }
        }
    );

module.exports = router;
