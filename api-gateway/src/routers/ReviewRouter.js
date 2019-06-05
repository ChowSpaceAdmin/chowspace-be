const express = require('express');
const Authentication = require('../middlewares/Authentication');
const ReviewService = require('../services/Review');

const router = express.Router();

router.post('/api/review', 

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            const payload = req.body;
            payload.user = req.user;
            const response = await ReviewService.createReview(payload);
            res.send(response);
        } catch(err) {
            next(err);
        }
    }

);

router.patch('/api/review/:id', 

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            const id = req.params.id;
            const payload = req.body;
            payload.user = req.user;
            const response = await ReviewService.updateReview(id, payload);
            res.send(response);
        } catch(err) {
            next(err);
        }
    }

);

router.post('/api/review/reply/:id', 

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            const id = req.params.id;
            const payload = req.body;
            payload.user = req.user;
            const response = await ReviewService.replyReview(id, payload);
            res.send(response);
        } catch(err) {
            next(err);
        }
    }

);

router.get('/api/renter/review',

    Authentication.authenticate,

    async (req, res ,next) => {
        try {
            const response = await ReviewService.getReview(req.user.id);
            res.send(response);
        } catch(err) {
            next(err);
        }
    }

);

router.get('/api/owner/review',

    Authentication.authenticate,

    async (req, res, next) => {
        try {
            const response = await ReviewService.getReview(null, req.query.place, null, req.user.id);
            res.send(response);
        } catch(err) {
            next(err);
        }
    }
);

module.exports = router;
