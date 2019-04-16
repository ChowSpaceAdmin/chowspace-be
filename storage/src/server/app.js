const express = require('express');

const config = require('./config');
const storeRouter = require('../routers/StoreRouter');
const errorHandlers = require('../middlewares/ErrorHandlers');

// Setup Express
const app = express();

app.use(express.json());
app.use(config.STATIC_ROUTE, express.static(config.STATIC_PATH));

app.use(storeRouter);

app.use(errorHandlers);

module.exports = app;
