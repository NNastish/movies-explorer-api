const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlCheck } = require('../constants');

const { getMovies, createMovie, deleteMovie } = require('../controllers/moviesController');

router.get('/', getMovies);

router.post('/', createMovie);

router.delete('/:movieId', deleteMovie);

