const multer = require('multer');
const _ = require('lodash');
const ValidationError = require('../errors/ValidationError');

/**
 * A Class that convert form-data
 * Text field stored in req.body
 * File field stored in req.files (content stored in memory)
 * Additional options to parse JSON for specific field
 */
class Parser {

    constructor() {
        this.JSON_DATA = 'json';
        this.upload = multer({storage: multer.memoryStorage()});
    }

    parseFormData(options) {
        const fields = _.keys(options);
        let middlewares = [];
        middlewares.push(this.upload.any());

        for (let field of fields) {
            if (options[field] === this.JSON_DATA) {
                middlewares.push(this._parseToJSON(field));
            }
        }

        return middlewares;
    }

    _parseToJSON(field) {
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
    }

}

module.exports = new Parser();
