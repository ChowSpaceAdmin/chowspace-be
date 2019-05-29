const express = require('express');
const _ = require('lodash');
const Account = require('../models/Account');
const TokenGenerator = require('../services/TokenGenerator');
const AuthorizationError = require('../errors/AuthorizationError');

const router = express.Router();

router.post('/authentication/login', async (req, res, next) => {
    try {
        const payload = _.pick(req.body, ['email', 'password']);
        const user = await Account.findByCredentials(payload.email, payload.password);

        if (!user.isActive) throw new AuthorizationError('Account Inactive.');

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

router.post('/authentication/refresh', async (req, res, next) => {
    try {
        const payload = _.pick(req.body, ['refresh']);
        const data = await TokenGenerator.verifyToken(payload.refresh);
        const id = data.sub;
        const user = await Account.findByAccountId(id);

        if (data.typ !== TokenGenerator.REFRESH) {
            throw new AuthorizationError('Invalid Token Type.');
        } else if (!user.isActive) {
            throw new AuthorizationError('Account Inactive.');
        }

        const tokens = await user.genTokens();

        res.send({tokens});
    } catch (err) {
        next(err);
    }
});

router.post('/authentication/verify', async (req, res, next) => {
    try {
        const payload = _.pick(req.body, ['access']);
        const data = await TokenGenerator.verifyToken(payload.access);

        if (data.typ !== TokenGenerator.ACCESS) {
            throw new AuthorizationError('Invalid Token Type.');
        }

        const user = {
            id: data.sub,
            isAdmin: data.adm,
            isVerified: data.ver,
            isActive: data.act
        };
        
        res.send({user});
    } catch (err) {
        next(err);
    }
});

module.exports = router;
