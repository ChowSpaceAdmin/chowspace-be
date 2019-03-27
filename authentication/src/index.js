const express = require('express');
const mongoose = require('mongoose');

const accountRouter = require('./routers/account');
const authenticationRouter = require('./routers/authenticaton');
const profileRouter = require('./routers/profile');

// Setup Mongo Database
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}`, {
    useNewUrlParser: true,
    dbName: MONGO_DATABASE,
    user: MONGO_USER,
    pass: MONGO_PASSWORD
});

// Setup express
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(accountRouter);
app.use(authenticationRouter);
app.use(profileRouter);

app.listen(PORT);
