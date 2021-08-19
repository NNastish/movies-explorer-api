require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { checkCors } = require('./middlewares/cors');
const { celebrate, Joi, errors } = require('celebrate');
// TODO: add import of login, createUser functions
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');

const { mongoUrl, mongoOptions } = require('./constants');

const app = express();

// making income data json like via bodyParses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connection to db
mongoose.connect(mongoUrl, mongoOptions);

// connect logger
app.use(requestLogger);

// checking cross origin resource sharing
app.use(checkCors);

// unprotected routes (signup && signin)
app.post('/signup');

app.post('/signin');

// protection of other routes
app.use(auth);

// routing

// pageNotFound
app.use('*');

// writing errors
app.use(errorLogger);

// handling error events
app.use(errors());
app.use(errorHandler);

module.exports = app;
