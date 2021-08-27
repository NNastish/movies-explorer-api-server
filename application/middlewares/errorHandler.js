const { internalServerError } = require('../constants');

// eslint-disable-next-line consistent-return
module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  const { statusCode = 500, message = internalServerError } = err;
  res.status(statusCode).send({ message });
};
