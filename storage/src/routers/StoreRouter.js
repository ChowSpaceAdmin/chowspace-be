const path = require('path');
const express = require('express');
const _ = require('lodash');
const config = require('../server/config');
const upload = require('../middlewares/MulterUpload');
const Parser = require('../middlewares/Parser');
const Permission = require('../middlewares/Permission');
const File = require('../models/File');

const router = express.Router();

router.post('/store/static',

    upload.array('files'),

    (req, res) => {
        const files = req.files;
        const locations = [];

        if (files) {
            files.forEach((file) => {
                const location = path.join(config.UPLOAD_ROUTE, file.filename);
                locations.push(location);
            });
        }

        res.send({
            locations
        });
    }
);

router.post('/store/secure',

    Parser.parseFormData({'user': Parser.JSON_DATA}),
    Permission.activeAccount,

    async (req, res, next) => {
        try {
            const payload = _.pick(req.body, 'user');
            const files = [];
            const promisses = [];

            if (!_.isEmpty(req.files)) {
                req.files.forEach((file) => {
                    promisses.push(File.createFile(file, payload.user.id));
                });
            }

            const responses = await Promise.all(promisses);
            responses.forEach((file) => {
                files.push(file.id);
            });

            res.send({
                files
            });
        } catch(err) {
            next(err);
        }
    }
);

module.exports = router;
