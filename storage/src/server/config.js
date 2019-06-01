const path = require('path');

const STATIC_ROUTE = '/static';
const STATIC_PATH = path.join(__dirname, '../../public');

const MAX_FILE_SIZE = 2097152;
const UPLOAD_DIRECTORY = '/files';
const UPLOAD_ROUTE = path.join(STATIC_ROUTE, UPLOAD_DIRECTORY);
const UPLOAD_PATH = path.join(STATIC_PATH, UPLOAD_DIRECTORY);

const DATA_PATH = path.join(__dirname, '../../data');

module.exports = {
    PORT: process.env.PORT,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_PORT: process.env.MONGO_PORT,
    MONGO_DATABASE: process.env.MONGO_DATABASE,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    STATIC_ROUTE,
    STATIC_PATH,
    MAX_FILE_SIZE,
    UPLOAD_ROUTE,
    UPLOAD_PATH,
    DATA_PATH
};
