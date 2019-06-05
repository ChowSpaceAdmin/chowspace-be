const mongoose = require('mongoose');
const _ = require('lodash');
const ReservationService = require('../services/Reservation');
const PlaceService = require('../services/Place');
const ValidationError = require('../errors/ValidationError');
const ModelNotFoundError = require('../errors/ModelNotFoundError');
const AuthorizationError = require('../errors/AuthorizationError');

const reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [25, 'Title can not be longer than 25 characters.']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [200, 'Description can not be longer than 200 characters.']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    reply: {
        type: String,
        trim: true,
        maxlength: [200, 'Reply can not be longer than 200 characters.'],
        default: ''
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    }
}, {
    minimize: false
});

// Review Statics
reviewSchema.statics.createObject = async function(user, place, title, description, rating) {

    const earlier = await this.findOne().byUser(user.id).byPlace(place);

    if (!_.isNull(earlier)) throw new ValidationError('Review already exists for this place by you.', 'review');

    const response = await ReservationService.getReservation(null, place, user.id, null,
        'accepted', null, null, null, null, null);

    if (_.isEmpty(response.reservations)) throw new ValidationError('Reservation does not exists.', 'review');

    const placeInfo = await PlaceService.getPlaceInfo(place);

    const review = await this.create({
        title,
        description,
        rating,
        user: user.id,
        place,
        owner: placeInfo.place.user
    });

    return review;
};

reviewSchema.statics.findByObjectId = async function(id) {
    let review;

    try {
        review = await this.findById(id);
    } catch(err) {
        if (err.name === 'CastError') throw new ModelNotFoundError('Review Not Found.');
        else throw err;
    }

    if (!review) throw new ModelNotFoundError('Review Not Found.');

    return review;
};

reviewSchema.statics.findObject = async function(request) {
    const query = this.find();

    if (request.user) query.byUser(request.user);
    if (request.place) query.byPlace(request.place);
    if (request.rating) query.byRating(request.rating);
    if (request.owner) query.byOwner(request.owner);

    const result = await query.exec();

    return result;
};

// Review Methos
reviewSchema.methods.getInfo = function() {
    return {
        id: this.id,
        title: this.title,
        description: this.description,
        rating: this.rating,
        user: this.user,
        place: this.place,
        reply: this.reply,
        owner: this.owner
    };
};

reviewSchema.methods.updateObject = async function(payload) {
    if (payload.user.id != this.user) throw new AuthorizationError('Requires Review Owner.');

    if (payload.title) this.title = payload.title;
    if (payload.description) this.description = payload.description;
    if (payload.rating) this.rating = payload.rating;

    await this.save();

};

reviewSchema.methods.replyUser = async function(payload) {
    if (payload.user.id != this.owner) throw new AuthorizationError('Requires Place Owner.');

    if (payload.reply) this.reply = payload.reply;

    await this.save();
};

// Review Queries
reviewSchema.query.byUser = function(user) {
    return this.where({user});
};

reviewSchema.query.byPlace = function(place) {
    return this.where({place});
};

reviewSchema.query.byOwner = function(owner) {
    return this.where({owner});
};

reviewSchema.query.byRating = function(rating) {
    return this.where({
        rating: {
            $gte: rating
        }
    });
};

// Review Hook
reviewSchema.pre('save', function() {
    if (this.isModified('rating')) this.rating = Math.floor(this.rating);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
