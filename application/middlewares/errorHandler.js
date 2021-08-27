const { internalServerError } = require('../constants');

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { statusCode = 500, message = internalServerError } = err;
  return res.status(statusCode).send({ message });
};
