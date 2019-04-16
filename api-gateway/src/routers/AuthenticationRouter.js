const express = require('express');

const authenticationService = require('../services/Authentication');

const router = express.Router();

router.post('/api/authentication/login', async (req, res, next) => {
    try {
        const data = await authenticationService.loginUser(req.body);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.post('/api/authentication/refresh', async (req, res, next) => {
    try {
        const data = await authenticationService.refreshUser(req.body);
        res.send(data);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
