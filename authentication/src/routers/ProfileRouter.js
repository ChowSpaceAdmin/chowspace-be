const express = require('express');
const _ = require('lodash');
const Account = require('../models/Account');
const Permission = require('../middlewares/Permission');
const Parser = require('../middlewares/Parser');
const Storage = require('../services/Storage');

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

router.patch('/profile', 
    Parser.parseFormData({
        'user': Parser.JSON_DATA,
        'telephones': Parser.JSON_DATA
    }),
    Permission.activeAccount, 
    async (req, res, next) => {
        try {
            const payload = _.pick(req.body, ['user', 'name', 'telephones']);
            let imageLocation = null;

            if (!_.isEmpty(req.files)) {
                const bufferFile = req.files.find(file => file.fieldname == 'image');
                if (bufferFile && Account.isValidImage(bufferFile)) {
                    const response = await Storage.storeStatic(bufferFile);
                    imageLocation = response.locations[0];
                }
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
