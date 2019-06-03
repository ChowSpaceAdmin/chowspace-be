const express = require('express');
const accountRouter = require('../routers/AccountRouter');
const authenticationRouter = require('../routers/AuthenticationRouter');
const profileRouter = require('../routers/ProfileRouter');
const errorHandlers = require('../middlewares/ErrorHandlers');

// Setup Mongo Database
require('./database');

// Setup express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(accountRouter);
app.use(authenticationRouter);
app.use(profileRouter);

app.use(errorHandlers);

module.exports = app;
