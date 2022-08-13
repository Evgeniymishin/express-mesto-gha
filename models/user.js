const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина имени пользователя 2 символа'],
    maxlength: [30, 'Максимальная длина имени пользователя 2 символа'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: [true, 'Поле about должно быть заполнено'],
    minlength: [2, 'Минимальная длина информации о пользователе 2 символа'],
    maxlength: [30, 'Максимальная длина информации о пользователе 2 символа'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: [true, 'Поле avatar должно быть заполнено'],
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^http(s|):\/\/(www.|)((\w+|\d+)(-|\.))+[a-z]{2,3}(\S+|)(#| +|)$/i.test(v);
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
    minlength: [8, 'Минимальная длина пароля 8 символов}'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
