const path = require('path');

const STATIC_ROUTE = '/static';
const STATIC_PATH = path.join(__dirname, '../../public');

const uploadDir = '/files';
const UPLOAD_PATH = path.join(STATIC_PATH, uploadDir);
const UPLOAD_ROUTE = path.join(STATIC_ROUTE, uploadDir);

module.exports = {
    PORT: process.env.PORT,
    STATIC_ROUTE,
    STATIC_PATH,
    UPLOAD_PATH,
    UPLOAD_ROUTE
};
