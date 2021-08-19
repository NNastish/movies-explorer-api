const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/authError');
const { emailCheck, urlCheck, loginErrorMessage } = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return emailCheck.test(v);
      },
      message: 'Укажите верную почту!',
    },
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
  }
});


// TODO: how to rewrite it to async await
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

userSchema.statics.createUserWithHashPass = function (req) {
  return bcrypt.hash(req?.body?.password, 10)
    .then((hash) => this.create({
      email: req.body.email,
      password: hash,
      name: req.body.name,
    }));
};

module.exports = mongoose.model('user', userSchema);
