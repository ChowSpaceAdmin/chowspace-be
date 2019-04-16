const express = require('express');
const _ = require('lodash');

const Account = require('../models/Account');
const Permissions = require('../middlewares/Permissions');

const router = express.Router();

router.post('/account', async (req, res, next) => {
    try {
        const payload = _.pick(req.body, ['email', 'password', 'name']);
        const user = await Account.createUser(payload.email, payload.password, payload.name);
        const tokens = await user.genTokens();
        const userInfo = user.getAccountInfo();

        res.send({
            user: userInfo,
            tokens
        });
    } catch (err) {
        next(err);
    }
});

router.post('/account/changePassword', Permissions.activeAccount, async (req, res, next) => {
    try {
        const payload = _.pick(req.body, ['user', 'old', 'new']);
        const user = await Account.findByAccountId(payload.user.id);
        await user.setPassword(payload.old, payload.new);

        res.send({
            success: true
        });
    } catch (err) {
        next(err);
    }
});

router.route('/account/:id')
    .get(async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await Account.findByAccountId(id);
            const userInfo = user.getAccountInfo();
            
            res.send({
                user: userInfo
            });
        } catch (err) {
            next(err);
        }
    })
    .delete(Permissions.adminAccount, async (req, res, next) => {
        try {
            const id = req.params.id;
            const user = await Account.findByAccountId(id);
            await user.disableAccount();
            
            res.send({
                success: true
            });
        } catch (err) {
            next(err);
        }
    });

module.exports = router;
