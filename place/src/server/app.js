const express = require('express');
const placeRouter = require('../routers/PlaceRouter');
const spaceRouter = require('../routers/SpaceRouter');
const keywordRouter = require('../routers/KeywordRouter');
const errorHandlers = require('../middlewares/ErrorHandlers');

// Setup Mongo Database
require('./database');

// Setup express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(placeRouter);
app.use(spaceRouter);
app.use(keywordRouter);

app.use(errorHandlers);

module.exports = app;
