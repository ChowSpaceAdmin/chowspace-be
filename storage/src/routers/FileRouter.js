const express = require('express');
const File = require('../models/File');
const AuthorizationError = require('../errors/AuthorizationError');
const FileNotFoundError = require('../errors/FileNotFoundError');

const router = express.Router();

router.route('/file/:id')
    .post(async (req, res, next) => {
        try {
            const id = req.params.id;
            const file = await File.findById(id);

            if (!file) throw new FileNotFoundError('File does not exist.');

            if (req.body.user.isAdmin || req.body.user.id == file.owner) {

                res.sendFile(file.location);

            } else {
                throw new AuthorizationError('Permission Denied. Unable to access file.');
            }
        } catch (err) {
            next(err);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const id = req.params.id;
            const file = await File.findById(id);

            if (!file) throw new FileNotFoundError('File does not exist.');

            if (req.body.user.isAdmin || req.body.user.id == file.owner) {

                const success = await File.deleteFile(id);
                res.send({
                    success
                });

            } else {
                throw new AuthorizationError('Permission Denied. Unable to access file.');
            }
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
