const express = require('express');
const Authentication = require('../middlewares/Authentication');
const Parser = require('../middlewares/Parser');
const PlaceService = require('../services/Place');

const router = express.Router();

router.route('/api/space')
    .post(

        Authentication.authenticate,
        Parser.convertToFormData(),

        async (req, res, next) => {
            try {
                const response = await PlaceService.createSpace(req.form);

                res.send(response);
            } catch(err) {
                next(err);
            }
        }
    );

module.exports = router;
