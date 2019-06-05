const express = require('express');
const _ = require('lodash');
const Review = require('../models/Review');
const Permission = require('../middlewares/Permission');
const EventEmitter = require('../services/EventEmitter');
const QueryConverter = require('../services/QueryConverter');

const router = express.Router();

router.post('/review',  

    Permission.activeAccount,

    async (req, res, next) => {
        try {
            const payload = _.pick(req.body, ['user', 'place', 'title', 'description', 'rating']);

            const review = await Review.createObject(payload.user, payload.place, payload.title, 
                payload.description, payload.rating);

            EventEmitter.emit(EventEmitter.REVIEW_CREATED, review.getInfo());

            res.send({
                review: review.getInfo()
            });
        } catch(err) {
            next(err);
        }
    }
);

router.get('/review', async (req, res, next) => {
    try {
        const result = await Review.findObject(req.query);

        const reviews = [];
        result.forEach(review => reviews.push(review.getInfo()));

        res.send({reviews});
    } catch(err) {
        next(err);
    }
});

router.patch('/review/:id', 

    Permission.activeAccount,

    async (req, res, next) => {
        try {
            const id = req.params.id;
            const payload = _.pick(req.body, ['user', 'title', 'description', 'rating']);
            
            const review = await Review.findByObjectId(id);

            const isChange = await review.updateObject(payload);

            if (isChange) EventEmitter.emit(EventEmitter.REVIEW_UPDATED, review.getInfo());

            res.send({
                review: review.getInfo()
            });
        } catch(err) {
            next(err);
        }
    }
);

router.post('/review/reply/:id', 

    Permission.activeAccount,

    async (req, res, next) => {
        try {
            const id = req.params.id;
            const payload = _.pick(req.body, ['user', 'reply']);

            const review = await Review.findByObjectId(id);

            const isChange = await review.replyUser(payload);

            if (isChange) EventEmitter.emit(EventEmitter.REVIEW_UPDATED, review.getInfo());

            res.send({
                review: review.getInfo()
            });
        } catch(err) {
            next(err);
        }
    }
);

router.get('/review/statistics', async (req, res, next) => {
    try {
        req.query.places = QueryConverter.convert(req.query.places, QueryConverter.ARRAY);

        const statistics = await Review.getStatistics(req.query.places);

        res.send({
            statistics
        });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
