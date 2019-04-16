const express = require('express');
const _ = require('lodash');

const Account = require('../models/Account');
const Permissions = require('../middlewares/Permissions');
const Parsers = require('../middlewares/Parsers');
const StorageService = require('../services/Storage');

const router = express.Router();

router.get('/profile/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await Account.findByAccountId(id);
        const profile = user.getProfileInfo();
        
        res.send({profile});
    } catch (err) {
        next(err);
    }
});

router.patch('/profile', Parsers.parseFormData({
        'user': Parsers.JSON_DATA,
        'telephones': Parsers.JSON_DATA,
        'image': Parsers.IMAGE_DATA
    }),
    Permissions.activeAccount, async (req, res, next) => {
        try {
            const payload = _.pick(req.body, ['user', 'name', 'telephones', 'image']);

            let imageLocation = null;
            if (payload.image) {
                imageLocation = await StorageService.storeStatic(payload.image);
            }

            const user = await Account.findByAccountId(payload.user.id);
            await user.updateProfile(payload.name, payload.telephones, imageLocation);
            const profile = user.getAccountInfo();

            res.send({user:profile});
        } catch (err) {
            next(err);
        }
});

module.exports = router;
