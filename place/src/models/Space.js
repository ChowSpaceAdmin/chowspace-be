const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('../server/config');
const Keyword = require('./Keyword');
const FileValidator = require('../services/FileValidator');
const Storage = require('../services/Storage');
const AuthorizationError = require('../errors/AuthorizationError');
const ModelNotFoundError = require('../errors/ModelNotFoundError');

const IMAGE_REGEX = /\.(jpe?g|png)$/i;
const MAX_FILE_SIZE = 2097152;

// Price
const priceSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        enum: ['DL', 'HL']
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    }
}, {
    _id: false,
    storeSubdocValidationError: false
});

// Price Hook
priceSchema.pre('save', function() {
    if (this.isModified('amount')) this.amount = Math.floor(this.amount);
});

// Space
const spaceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [25, 'Name can not be more than 25 characters.'],
        index: true
    },
    description: {
        type: String,
        required: true,
        trim:  true,
        maxlength: [50, 'Description can not be more than 50 characters.']
    },
    dimension: {
        type: Number,
        required: true,
        min: 1
    },
    capacity: {
        type: Number,
        required: true,
        min:1
    },
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    showcaseImage: {
        type: String,
        trim: true,
        default: config.DEFAULT_PLACEHOLDER_IMG
    },
    images: [{
        type: String,
        trim: true
    }],
    keywords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Keyword'
    }],
    place: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'Place'
    },
    prices: {
        type: [priceSchema],
        validate: {
            validator: (v) => v.length >= 1,
            message: props => 'Must have atleast 1 price.'
        }
    },
    isHidden: {
        type: Boolean,
        required: true,
        default: false,
        index: true
    }
}, {
    useNestedStrict: true,
    timestamps: true
});

// Space Statics
spaceSchema.statics.createObject = async function(user, placeId, name, description, 
    dimension, capacity, amount, showcaseImage, bufferFiles, keywords, prices) {

    const place = await this.model('Place').findByObjectId(placeId);
    if (user.id != place.user) {
        throw new AuthorizationError('Permission Denied. Requires Place Owner Account.');
    }
    
    const Space = this.model('Space');
    const payload = {
        place: place.id,
        name,
        description,
        dimension,
        capacity,
        amount,
        keywords: []
    };

    if (prices) payload.prices = prices;

    if (!_.isArray(keywords)) keywords = [];
    const keys = await Keyword.findObject('SP', keywords, {
        select: 'id'
    });
    keys.forEach(key => payload.keywords.push(key.id));

    const space = new Space(payload);

    await space.validate();

    bufferFiles = bufferFiles.filter(file => FileValidator.isValid(file, IMAGE_REGEX, MAX_FILE_SIZE));

    let response = null;
    let files = [];
    for(let i = 0; i < bufferFiles.length; i++) {
        let file = bufferFiles[i];
        if (file.originalname == showcaseImage) {
            response = await Storage.storeStatic([file]);
            space.showcaseImage = response.locations[0];
        } else {
            files.push(file);
        }
    }

    if (!_.isEmpty(files)) {
        response = await Storage.storeStatic(files);
        space.images = response.locations;
    }

    await space.save();

    return space;
};

spaceSchema.statics.findByObjectId = async function(id) {
    let space;

    try {
        space = await this.findById(id);
    } catch(err) {
        if (err.name === 'CastError') throw new ModelNotFoundError('Space Not Found.');
        else throw err;
    }

    if (!space) throw new ModelNotFoundError('Space Not Found.');

    return space;
};

spaceSchema.statics.findObject = async function(id, keywords, options) {
    const query = this.find().byHidden(false);

    if (id) query.byId(id);
    if (keywords) query.byKeywords(keywords);
    if (options && options.select) query.only(options.select);

    const result = await query.exec();

    return result;
};

// Space Methods
spaceSchema.methods.getInfo = async function() {
    const space = await this.populate('keywords').execPopulate();

    const keywords = [];
    space.keywords.forEach(keyword => {
        keywords.push(keyword.getInfo());
    });

    return {
        id: space.id,
        name: space.name,
        description: space.description,
        images: space.images,
        showcaseImage: space.showcaseImage,
        dimension: space.dimension,
        capacity: space.capacity,
        amount: space.amount,
        prices: space.prices,
        keywords,
        place: space.place
    };
};

spaceSchema.methods.getInfoOwner = function() {
    return {
        id: this.id,
        name: this.name,
        description: this.description,
        dimension: this.dimension,
        capacity: this.capacity,
        amount: this.amount,
        prices: this.prices,
        isHidden: this.isHidden
    };
};

// Space Hooks
spaceSchema.pre('save', function() {
    if (this.isModified('dimension')) this.dimension = Math.floor(this.dimension);
    if (this.isModified('capacity')) this.capacity = Math.floor(this.capacity);
    if (this.isModified('amount')) this.amount = Math.floor(this.amount);
});

// Space Query
spaceSchema.query.only = function(select) {
    return this.select(select);
};

spaceSchema.query.byId = function(id) {
    return this.where({
        '_id': id
    });
};

spaceSchema.query.byKeywords = function(keywords) {
    return this.where({
        'keywords': {
            $in: keywords
        }
    });
};

spaceSchema.query.byHidden = function(isHidden) {
    return this.where({isHidden});
};

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
