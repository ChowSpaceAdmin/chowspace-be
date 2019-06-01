const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('../server/config');
const ModelNotFoundError = require('../errors/ModelNotFoundError');
const FileValidator = require('../services/FileValidator');
const TimeValidator = require('../services/TimeValidator');
const Storage = require('../services/Storage');
const Keyword = require('./Keyword');

const IMAGE_REGEX = /\.(jpe?g|png)$/i;
const MAX_FILE_SIZE = 2097152;

// Geometry
const geometrySchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Point'],
        default: 'Point'
    },
    coordinates: {
        // longitude, latitude
        type: [Number],
        required: true,
        validate: {
            validator: (v) => v.length == 2,
            message: props => 'Coordinates requires only longitude and latitude.'
        }
    }
}, {
    _id: false,
    storeSubdocValidationError: false
});

// OpenTime
const openTimeSchema = mongoose.Schema({
    day: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    },
    from: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => TimeValidator.isValidTime(v),
            message: props => 'Invalid Time Format'
        }
    },
    till: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: (v) => TimeValidator.isValidTime(v),
            message: props => 'Invalid Time Format'
        }
    }
}, {
    _id: false,
    storeSubdocValidationError: false
});

// Place
const placeSchema = mongoose.Schema({
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
        maxlength: [1000, 'Description can not be more than 1000 characters.']
    },
    address: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Address can not be more than 100 characters.']
    },
    location: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, 'Location can not be more than 50 characters.'],
        index: true
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
    telephones: [{
        type: String,
        trim: true,
        maxlength: [25, 'Telephone must be no more than 25 characters.'],
        validate: {
            validator: /^[0-9-]+$/,
            message: props => `${props.value} is not a valid telephone number.`
        }
    }],
    isVerified: {
        type: Boolean,
        required: true,
        default: false,
        index: true
    },
    isHidden: {
        type: Boolean,
        required: true,
        default: false,
        index: true
    },
    geometry: {
        type: geometrySchema,
        required: true
    },
    openTimes: {
        type: [openTimeSchema],
        validate: {
            validator: (v) => v.length >= 1,
            message: props => 'Must have atleast 1 open time.'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true
    },
    keywords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Keyword'
    }],
    documents: [mongoose.Schema.Types.ObjectId]
}, {
    useNestedStrict: true,
    timestamps: true
});

// Place Statics
placeSchema.statics.createObject = async function(user, name, description, address, location,
        longitude, latitude, showcaseImage, bufferFiles, telephones, keywords, openTimes) {
    const Place = this.model('Place');
    const payload = {
        user: user.id,
        name,
        description,
        address,
        location,
        geometry: {
            coordinates: [longitude, latitude]
        },
        telephones,
        keywords: []
    };

    if (openTimes) payload.openTimes = openTimes;

    keywords = keywords ? keywords : [];
    const keys = await Keyword.findObject('PL', keywords, {
        select: 'id'
    });
    keys.forEach(key => payload.keywords.push(key.id));

    const place = new Place(payload);

    await place.validate();

    bufferFiles = bufferFiles.filter(file => FileValidator.isValid(file, IMAGE_REGEX, MAX_FILE_SIZE));

    let response = null;
    let files = [];
    for(let i = 0; i < bufferFiles.length; i++) {
        let file = bufferFiles[i];
        if (file.originalname == showcaseImage) {
            response = await Storage.storeStatic([file]);
            place.showcaseImage = response.locations[0];
        } else {
            files.push(file);
        }
    }

    if (!_.isEmpty(files)) {
        response = await Storage.storeStatic(files);
        place.images = response.locations;
    }

    await place.save();

    return place;
};

placeSchema.statics.findByObjectId = async function(id) {
    let place;

    try {
        place = await this.findById(id);
    } catch(err) {
        if (err.name === 'CastError') throw new ModelNotFoundError('Place Not Found.');
        else throw err;
    }

    if (!place) throw new ModelNotFoundError('Place Not Found.');

    return place;
};

// Place Methods
placeSchema.methods.getInfo = async function() {
    const place = await this.populate('keywords').populate('spaces').execPopulate();

    const keywords = [];
    place.keywords.forEach(keyword => {
        keywords.push(keyword.getInfo());
    });

    const spaces = [];
    for(let i = 0; i < place.spaces.length; i++) {
        let info = await place.spaces[i].getInfo();
        spaces.push(info);
    }

    return {
        id: place.id,
        name: place.name,
        description: place.description,
        address: place.address,
        location: place.location,
        telephones: place.telephones,
        longitude: place.geometry.coordinates[0],
        latitude: place.geometry.coordinates[1],
        images: place.images,
        showcaseImage: place.showcaseImage,
        isVerified: place.isVerified,
        openTimes: place.openTimes,
        keywords,
        spaces,
        user: place.user
    };
};

// Place Virtuals
placeSchema.virtual('spaces', {
    ref: 'Space',
    localField: '_id',
    foreignField: 'place'
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
