const express = require('express');
const AuthenticationService = require('../services/Authentication');

const router = express.Router();

router.post('/api/authentication/login', async (req, res, next) => {
    try {
        const data = await AuthenticationService.loginUser(req.body);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.post('/api/authentication/refresh', async (req, res, next) => {
    try {
        const data = await AuthenticationService.refreshUser(req.body);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
