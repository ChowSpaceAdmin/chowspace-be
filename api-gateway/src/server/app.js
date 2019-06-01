const express = require('express');
const cors = require('cors');

const accountRouter = require('../routers/AccountRouter');
const authenticationRouter = require('../routers/AuthenticationRouter');
const keywordRouter = require('../routers/KeywordRouter');
const errorHandlers = require('../middlewares/ErrorHandlers');

// Set up Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use(accountRouter);
app.use(authenticationRouter);
app.use(keywordRouter);

app.use(errorHandlers);

module.exports = app;
