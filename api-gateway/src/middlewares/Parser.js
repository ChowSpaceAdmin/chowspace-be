const multer = require('multer');
const FormData = require('form-data');
const _ = require('lodash');
const uploads = multer({storage: multer.memoryStorage()});

class Parser {

    _convert() {
        return (req, res, next) => {
            const form = new FormData();
            
            if (req.user) form.append('user', JSON.stringify(req.user));
    
            const keys = _.keys(req.body);
            keys.forEach((k) => {
                form.append(k, req.body[k]);
            });
    
            if (_.isArray(req.files) && !_.isEmpty(req.files)) {
                req.files.forEach((file) => {
                    form.append(file.fieldname, file.buffer, {
                        filename: file.originalname,
                        contentType: file.mimetype
                    });
                });
            }
    
            req.form = form;
            next();
        };
    }
    
    convertToFormData() {
        return [uploads.any(), this._convert()];
    }

}

module.exports = new Parser();
