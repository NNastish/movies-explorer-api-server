const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authError');
const { authError, jwtDevelopment } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new AuthError(authError));
  }
  const token = authorization.replace('Bearer ', '');
  const passFraze = NODE_ENV === 'production' ? JWT_SECRET : jwtDevelopment;
  let payload;
  try {
    payload = jwt.verify(token, passFraze);
  } catch (e) {
    next(new AuthError(authError));
  }
  req.user = payload;
  next();
};
