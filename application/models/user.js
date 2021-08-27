const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/authError');
const { loginErrorMessage } = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});
// eslint-disable-next-line
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(loginErrorMessage);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(loginErrorMessage);
          }
          return user;
        });
    });
};
// eslint-disable-next-line
userSchema.statics.createUserWithHashPass = function (req) {
  return bcrypt.hash(req?.body?.password, 10)
    .then((hash) => this.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }));
};

module.exports = mongoose.model('user', userSchema);
