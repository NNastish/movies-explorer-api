require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { checkCors } = require('./middlewares/cors');
// TODO: add import of login, createUser functions
const { login, createUser } = require('./controllers/usersController');
const { auth } = require('./middlewares/auth');
const { errorHandler } = require('./middlewares/errorHandler');
const { mongoUrl, mongoOptions, pageNotFound } = require('./constants');
const NotFoundError = require('./errors/notFoundError');

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
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30).required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

// protection of other routes
app.use(auth);

// routing
app.use('/users', require('./routes/usersRoute'));
app.use('/movies', require('./routes/moviesRoute'));

// pageNotFound
app.use('*', (req, res, next) => {
  next(new NotFoundError(pageNotFound));
});

// writing errors
app.use(errorLogger);

// handling error events
app.use(errors());
app.use(errorHandler);

module.exports = app;
