const mongoose = require('mongoose');
const config = require('./config');

const MONGO_HOST = config.MONGO_HOST;
const MONGO_PORT = config.MONGO_PORT;
const MONGO_DATABASE = config.MONGO_DATABASE;
const MONGO_USER = config.MONGO_USER;
const MONGO_PASSWORD = config.MONGO_PASSWORD;

const options = {
    useNewUrlParser: true,
    dbName: MONGO_DATABASE,
    user: MONGO_USER,
    pass: MONGO_PASSWORD,
    useCreateIndex: true
};

const connectRetry = () => {
    
    mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, options)
        .then(() => {
            console.log('MongoDB Connected');
        })
        .catch((err) => {
            console.log('MongoDB Connection Error. Retrying in 5 seconds.');
            setTimeout(connectRetry, 5000);
        });


};

connectRetry();
