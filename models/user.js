const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина имени пользователя 2 символа'],
    maxlength: [30, 'Максимальная длина имени пользователя 2 символа'],
  },
  about: {
    type: String,
    required: [true, 'Поле about должно быть заполнено'],
    minlength: [2, 'Минимальная длина информации о пользователе 2 символа'],
    maxlength: [30, 'Максимальная длина информации о пользователе 2 символа'],
  },
  avatar: {
    type: String,
    required: [true, 'Поле avatar должно быть заполнено'],
  },
});

module.exports = mongoose.model('user', userSchema);
