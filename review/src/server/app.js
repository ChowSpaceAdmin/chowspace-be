const express = require('express');
const reviewRouter = require('../routers/ReviewRouter');
const errorHandlers = require('../middlewares/ErrorHandlers');

// Setup Databases
require('../database/mongoose');

// Setup express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(reviewRouter);

app.use(errorHandlers);

module.exports = app;
