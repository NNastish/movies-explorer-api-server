const routeDistributor = require('express').Router();
const NotFoundError = require('../errors/notFoundError');
const { pageNotFound } = require('../constants');

routeDistributor.use('/users', require('./usersRoute'));
routeDistributor.use('/movies', require('./moviesRoute'));

routeDistributor.use('*', (req, res, next) => {
  next(new NotFoundError(pageNotFound));
});

module.exports = routeDistributor;
