const express = require('express');
const Authentication = require('../middlewares/Authentication');
const Parser = require('../middlewares/Parser');
const PlaceService = require('../services/Place');

const router = express.Router();

router.route('/api/keyword')
    .post(

        Authentication.authenticate,
        Parser.convertToFormData(),

        async (req, res, next) => {
            try {
                const data = await PlaceService.createKeyword(req.form);
                res.send(data);
            } catch(err) {
                next(err);
            }
        }
    )
    .get(async (req, res, next) => {
        try {
            const data = await PlaceService.getKeyword(req.query.type);
            res.send(data);
        } catch(err) {
            next(err);
        }        
    });

module.exports = router;
