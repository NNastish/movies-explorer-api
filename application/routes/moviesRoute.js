const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { makeValidationErrorStr } = require('../utils');
const { getMovies, createMovie, deleteMovie } = require('../controllers/moviesController');

router.get('/', getMovies);

// TODO: в будущем можно добавить валидацию имен на языках через regex
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(makeValidationErrorStr('image'));
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(makeValidationErrorStr('trailer'));
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(makeValidationErrorStr('thumbnail'));
    }),
    movieId: Joi.number().required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
