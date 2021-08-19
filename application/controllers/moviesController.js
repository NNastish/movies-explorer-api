const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const AccessError = require('../errors/accessError');
const { invalidDataMessage, movieNotFoundMessage, accessDenied } = require('../constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const {
      country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId
    } = req.body;
    const card = await Card.create({
      country: country,
      director: director,
      duration: duration,
      year: year,
      description: description,
      image: image,
      trailer: trailer,
      nameRU: nameRU,
      nameEN: nameEN,
      thumbnail: thumbnail,
      movieId: movieId,
      owner: req.user._id,
    });
    res.send(card);
  } catch (e) {
    next(new BadRequestError(invalidDataMessage));
  }
}

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params;
    const movie = await Movie.findById(movieId).orFail(new NotFoundError(movieNotFoundMessage));
    if (movie.owner === req.user._id) {
      //movie.owner.toString() ?
      // TODO: define is movie.owner type correct
      console.log(movie.owner);
      const deleted = await Movie.findByIdAndDelete(movieId);
      res.send(deleted);
    } else {
      next(new AccessError(accessDenied));
    }
  } catch (e) {
    next(e);
  }
}
