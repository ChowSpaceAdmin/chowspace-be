const express = require('express');
const AuthenticationService = require('../services/Authentication');
const Authentication = require('../middlewares/Authentication');
const Parser = require('../middlewares/Parser');

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
        const payload = req.body;
        payload.user = req.user;
        const data = await AuthenticationService.changePassword(payload);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.get('/api/account', Authentication.authenticate, async (req, res, next) => {
    try {
        const data = await AuthenticationService.getAccountInfo(req.user.id);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.patch('/api/account', Authentication.authenticate, Parser.convertToFormData(), async (req, res, next) => {
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
            user: req.user
        });
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.get('/api/profile', async (req, res, next) => {
    try {
        const response = await AuthenticationService.getAllProfile(req.query.id);
        res.send(response);
    } catch(err) {
        next(err);
    }
});

module.exports = router;
