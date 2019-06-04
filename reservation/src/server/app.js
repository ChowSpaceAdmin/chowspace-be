const express = require('express');
const errorHandlers = require('../middlewares/ErrorHandlers');
const reservationRouter = require('../routers/ReservationRouter');

// Set Up Database
require('./database');

// Set Up Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(reservationRouter);

app.use(errorHandlers);

module.exports = app;
