const mongoose = require('mongoose');
const _ = require('lodash');
const ValidationError = require('../errors/ValidationError');
const ModelNotFoundError = require('../errors/ModelNotFoundError');
const FileValidator = require('../services/FileValidator');
const Storage = require('../services/Storage');

const IMAGE_REGEX = /\.(jpe?g|png)$/i;
const MAX_FILE_SIZE = 2097152;

// Keyword
const keywordSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [10, 'Name can not be longer than 10 characters.']
    },
    type: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        enum: ['PL', 'SP']
    },
    icon: {
        type: String,
        trim: true
    },
});

// Keyword Statics
keywordSchema.statics.createObject = async function(name, type, bufferFile) {
    const Keyword = this.model('Keyword');
    const keyword = new Keyword({
        name,
        type
    });

    await keyword.validate();
    if (!FileValidator.isValid(bufferFile, IMAGE_REGEX, MAX_FILE_SIZE)) {
        throw new ValidationError('Unsupported File Format.', 'icon');
    }

    const response = await Storage.storeStatic([bufferFile]);
    keyword.icon = response.locations[0];
    await keyword.save();

    return keyword;
};

keywordSchema.statics.findByObjectId = async function(id) {
    let keyword;

    try {
        keyword = await this.findById(id);
    } catch(err) {
        if (err.name === 'CastError') throw new ModelNotFoundError('Keyword Not Found.');
        else throw err;
    }

    if (!keyword) throw new ModelNotFoundError('Keyword Not Found.');

    return keyword;
};

keywordSchema.statics.findObject = async function(type, ids, options) {
    const query = this.find();

    if (type) query.byType(type);
    if (ids) query.byIds(ids);
    if (options && options.select) query.only(options.select);

    const result = await query.exec();

    return result;
};

// Keyword Methods
keywordSchema.methods.getInfo = function() {
    return {
        id: this.id,
        name: this.name,
        type: this.type,
        icon: this.icon
    };
};

keywordSchema.methods.updateObject = async function(name, type, bufferFile) {
    if (name) this.name = name;
    if (type) this.type = type;

    await this.validate();

    if (bufferFile) {
        if (FileValidator.isValid(bufferFile, IMAGE_REGEX, MAX_FILE_SIZE)) {
            const response = await Storage.storeStatic([bufferFile]);
            this.icon = response.locations[0];
        } else {
            throw new ValidationError('Unsupported File Format.', 'icon');
        }
    }

    await this.save();
};

// Keyword Queries
keywordSchema.query.byType = function(type) {
    return this.where({type});
};

keywordSchema.query.byIds = function(ids) {
    return this.where({
        '_id': {
            $in: ids
        }
    });
};

keywordSchema.query.only = function(select) {
    return this.select(select);
};

const Keyword = mongoose.model('Keyword', keywordSchema);

module.exports = Keyword;
