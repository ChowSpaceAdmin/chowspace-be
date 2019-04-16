const multer = require('multer');
const uuidv4 = require('uuid/v4');

const config = require('../server/config');
const MulterError = require('../errors/MulterError');

const ALLOWED_FILES_REGEX = /.*\.(jpg|jpeg|png)$/i;
const EXTENSION_REGEX = /\.(jpg|jpeg|png)$/i;
const MAX_FILE_SIZE = 2097152;
const SINGLE_FORM_FIELD = 'file';

const storage = multer.diskStorage({
    destination: config.UPLOAD_PATH,
    filename: (req, file, cb) => {
        const result = file.originalname.match(EXTENSION_REGEX);
        const random = uuidv4();
        const name = `${random}${result[0]}`;
        cb(null, name);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: MAX_FILE_SIZE
    },
    fileFilter: (req, file, cb) => {
        if (ALLOWED_FILES_REGEX.test(file.originalname)) {
            cb(null, true);
        }
        else {
            cb(new MulterError('Invalid File Extension.'));
        }
    }
});

module.exports = {
    single: upload.single(SINGLE_FORM_FIELD)
};
