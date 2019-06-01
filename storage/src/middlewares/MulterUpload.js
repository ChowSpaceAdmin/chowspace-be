const path = require('path');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const config = require('../server/config');

const storage = multer.diskStorage({
    destination: config.UPLOAD_PATH,
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const random = uuidv4();
        const name = `${random}${extension}`;
        cb(null, name);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: config.MAX_FILE_SIZE
    }
});

module.exports = upload;
