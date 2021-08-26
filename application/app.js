require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { checkCors } = require('./middlewares/cors');
const { errorHandler } = require('./middlewares/errorHandler');
const { mongoUrl, mongoOptions } = require('./constants');

const app = express();

// making income data json like via bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connection to db
mongoose.connect(mongoUrl, mongoOptions);

// connect logger
app.use(requestLogger);

// checking cross origin resource sharing
app.use(checkCors);

// adding routes
app.use(require('./routes/index'));

// writing errors
app.use(errorLogger);

// handling error events
app.use(errors());
app.use(errorHandler);

module.exports = app;
