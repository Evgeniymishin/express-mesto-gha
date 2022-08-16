const mongoose = require('mongoose');
const { default: isURL } = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле name должно быть заполнено'],
    minlength: [2, 'Минимальная длина имени карточки 2 символа'],
    maxlength: [30, 'Максимальная длина имени карточки 30 символов'],
  },
  link: {
    type: String,
    validate: {
      validator: isURL,
      message: 'Поле link заполнено неккоректно',
    },
    required: [true, 'Поле link должно быть заполнено'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('card', cardSchema);
