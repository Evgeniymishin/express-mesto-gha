const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const { REG_EXP_LINK } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина имени пользователя 2 символа'],
    maxlength: [30, 'Максимальная длина имени пользователя 2 символа'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина информации о пользователе 2 символа'],
    maxlength: [30, 'Максимальная длина информации о пользователе 2 символа'],
    default: 'Исследователь океана',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return REG_EXP_LINK.test(v);
      },
      message: 'Поле avatar заполнено неправильно',
    },
  },
  email: {
    type: String,
    unique: [true, 'Пользователь с таким email уже существует'],
    required: [true, 'Поле email должно быть заполнено'],
    validate: {
      validator: isEmail,
      message: 'Поле email заполнено неккоректно',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password должно быть заполнено'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
