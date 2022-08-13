const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/bad-request');
const InternalServerError = require('../errors/internal-server-err');
const ConflictError = require('../errors/conflict-err');
const {
  SALT_LENGTH,
  SECRET_KEY,
  TOKEN_LIFETIME,
} = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Некорректный id пользователя'));
      } else {
        next(new InternalServerError('Произошла ошибка'));
      }
    });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.send({ data: user });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, SALT_LENGTH).then((hash) => User.create({
    name, about, avatar, email, password: hash,
  })
    .then((user) => res.send({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      about: user.about,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err}`));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(new InternalServerError('Произошла ошибка'));
      }
    }));
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      about: req.body.about,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.send({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        about: user.about,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err}`));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      } else {
        next(new InternalServerError('Произошла ошибка'));
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      avatar: req.body.avatar,
    },
    { new: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      return res.send({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        about: user.about,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err}`));
      } else if (err.name === 'CastError') {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      } else {
        next(new InternalServerError('Произошла ошибка'));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email } = req.body;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь по указанному id не найден'));
      }
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: TOKEN_LIFETIME });
      return res.send({ token });
    })
    .catch(next);
};
