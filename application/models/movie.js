const mongoose = require('mongoose');
const { urlCheck } = require('../constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlCheck.test(v);
      },
      message: 'Укажите верный путь до изображения',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlCheck.test(v);
      },
      message: 'Укажите верный путь до трейлера',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlCheck.test(v);
      },
      message: 'Укажите верный путь до миниатюрного изображения',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String, // сомневаюсь, верный ли тип
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
