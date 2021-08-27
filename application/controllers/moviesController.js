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
      country, director, duration, year, description, image, trailer,
      nameRU, nameEN, thumbnail, movieId,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    res.send({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      owner: movie.owner,
    });
  } catch (e) {
    next(new BadRequestError(invalidDataMessage));
  }
};

// Удаляет по id нашей базы, которое movie получило при создании
module.exports.deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId).orFail(new NotFoundError(movieNotFoundMessage));
    if (movie.owner.toString() === req.user._id) {
      const deleted = await Movie.findByIdAndDelete(movie._id);
      res.send(deleted);
    } else {
      next(new AccessError(accessDenied));
    }
  } catch (e) {
    next(e);
  }
};
