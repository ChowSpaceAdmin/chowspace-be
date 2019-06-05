const express = require('express');
const _ = require('lodash');
const Review = require('../models/Review');
const Permission = require('../middlewares/Permission');

const router = express.Router();

router.post('/review',  

    Permission.activeAccount,

    async (req, res, next) => {
        try {
            const payload = _.pick(req.body, ['user', 'place', 'title', 'description', 'rating']);

            const review = await Review.createObject(payload.user, payload.place, payload.title, 
                payload.description, payload.rating);

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

            await review.updateObject(payload);

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

            await review.replyUser(payload);

            res.send({
                review: review.getInfo()
            });
        } catch(err) {
            next(err);
        }
    }
);

module.exports = router;
