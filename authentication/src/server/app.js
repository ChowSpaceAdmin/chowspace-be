const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const accountRouter = require('../routers/AccountRouter');
const authenticationRouter = require('../routers/AuthenticationRouter');
const profileRouter = require('../routers/ProfileRouter');
const errorHandlers = require('../middlewares/ErrorHandlers');

// Setup Mongo Database
const MONGO_HOST = config.MONGO_HOST;
const MONGO_PORT = config.MONGO_PORT;
const MONGO_DATABASE = config.MONGO_DATABASE;
const MONGO_USER = config.MONGO_USER;
const MONGO_PASSWORD = config.MONGO_PASSWORD;

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, {
    useNewUrlParser: true,
    dbName: MONGO_DATABASE,
    user: MONGO_USER,
    pass: MONGO_PASSWORD,
    useCreateIndex: true
});

// Setup express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(accountRouter);
app.use(authenticationRouter);
app.use(profileRouter);

app.use(errorHandlers);

module.exports = app;
