const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/notFoundError');
const EmailCreationError = require('../errors/emailCreationError');
const { notFoundMessage, jwtDevelopment, emailDuplicatedMessage } = require('../constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getUserInfo = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const user = await User.findById(id).orFail(new NotFoundError(notFoundMessage));
    res.status(200).send({
      email: user.email,
      name: user.name,
    });
  } catch (e) {
    next(e);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const { _id: id } = req.user;
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      upsert: false,
    }).orFail(new NotFoundError(notFoundMessage));
    res.send({
      name: user.name,
      email: user.email,
      _id: id,
    });
  } catch (e) {
    if (e.code === 11000 && e.name === 'MongoError') {
      next(new EmailCreationError(emailDuplicatedMessage));
    } else {
      next(e);
    }
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const jwtToken = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : jwtDevelopment,
        { expiresIn: '7d' },
      );
      res.send({
        token: jwtToken,
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  User.createUserWithHashPass(req)
    .then((user) => res.send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.code === 11000 && err.name === 'MongoError') {
        next(new EmailCreationError(emailDuplicatedMessage));
      } else {
        next(err);
      }
    });
};
