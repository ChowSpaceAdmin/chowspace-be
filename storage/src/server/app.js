const express = require('express');
const config = require('./config');
const storeRouter = require('../routers/StoreRouter');
const fileRouter = require('../routers/FileRouter');
const errorHandlers = require('../middlewares/ErrorHandlers');

// Setup Mongo Database
require('./database');

// Setup Express
const app = express();

app.use(express.json());
app.use(config.STATIC_ROUTE, express.static(config.STATIC_PATH));

app.use(storeRouter);
app.use(fileRouter);

app.use(errorHandlers);

module.exports = app;
