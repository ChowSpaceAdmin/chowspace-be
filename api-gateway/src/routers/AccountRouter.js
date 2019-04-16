const express = require('express');

const AuthenticationService = require('../services/Authentication');
const Authentication = require('../middlewares/Authentication');
const Parsers = require('../middlewares/Parsers');

const router = express.Router();

router.post('/api/account', async (req, res, next) => {
    try {
        const data = await AuthenticationService.createUser(req.body);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.post('/api/account/changePassword', Authentication.authenticate, async (req, res, next) => {
    try {
        const data = await AuthenticationService.changePassword(req.body);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.get('/api/account', Authentication.authenticate, async (req, res, next) => {
    try {
        const data = await AuthenticationService.getAccountInfo(req.body.user.id);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.patch('/api/account', Authentication.authenticate, Parsers.convertToFormData(), async (req, res, next) => {
    try {
        const data = await AuthenticationService.updateAccount(req.form);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.delete('/api/account/:id', Authentication.authenticate, async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await AuthenticationService.banAccount(id, {
            user: req.body.user
        });
        res.send(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
