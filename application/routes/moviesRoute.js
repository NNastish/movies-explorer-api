const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlCheck } = require('../constants');

const { getMovies, createMovie, deleteMovie } = require('../controllers/moviesController');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlCheck),
    trailer: Joi.string().required().pattern(urlCheck),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(urlCheck),
    movieId: Joi.string().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    // FIXME
    // не знаю в каком виде приходит movieId пока что
    movieId: Joi.string().hex(),
  }),
}), deleteMovie);

