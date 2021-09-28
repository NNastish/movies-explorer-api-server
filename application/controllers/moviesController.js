const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const AccessError = require('../errors/accessError');
const { invalidDataMessage, movieNotFoundMessage, accessDenied } = require('../constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate('owner')
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const {
      country, director, duration, year, description, image, trailer,
      nameRU, nameEN, thumbnail, movieId,
    } = req.body;
    const params = {
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
    };
    const existingMovies = Movie.find({ movieId: params.movieId });
    if (existingMovies.some((movie) => movie.owner.toString() === req.user._id)) {
      res.send(params);
    } else {
      const movie = await Movie.create(params);
      res.send(movie);
    }
    // if (!existingMovie) {
    //     const movie = await Movie.create(params);
    //     res.send(movie);
    // } else {
    //   res.send(existingMovie);
    // }
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
