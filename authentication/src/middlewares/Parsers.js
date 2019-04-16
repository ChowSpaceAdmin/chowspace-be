const multer = require('multer');
const _ = require('lodash');

const ValidationError = require('../errors/ValidationError');

const JSON_DATA = 'json';
const IMAGE_DATA = 'image';

const upload = multer({storage: multer.memoryStorage()});

const _parseToJSON = (field) => {
    return (req, res, next) => {
        try {
            if(req.body[field]) {
                req.body[field] = JSON.parse(req.body[field]);
            }
            next();
        } catch (err) {
            next(new ValidationError('Requires JSON Parsable Format.', field));
        }
    };
};

const _populateImage = (field) => {
    return (req, res, next) => {
        let deleteField = true;
        if (_.isArray(req.files) && !_.isEmpty(req.files)) {
            const file = req.files.find((e) => e.fieldname === field);
            if (file) {
                req.body[field] = file;
                deleteField = false;
            }
        }
        if (deleteField) delete req.body[field];
        next();
    };
};

const parseFormData = (options) => {
    let result = [];

    const fields = Object.keys(options);

    result.push(upload.any());

    for (let field of fields) {
        const type = options[field];

        if (type === JSON_DATA) {
            result.push(_parseToJSON(field));
        } else if (type === IMAGE_DATA) {
            result.push(_populateImage(field));
        }
    }

    return result;
};

module.exports = {
    parseFormData,
    JSON_DATA,
    IMAGE_DATA,
};
