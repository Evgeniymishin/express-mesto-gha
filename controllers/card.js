const Card = require('../models/card');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/bad-request');
const InternalServerError = require('../errors/internal-server-err');
const ForbiddenError = require('../errors/no-acess');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Переданы некорректные данные: ${err}`));
      }
      next(new InternalServerError('Произошла ошибка'));
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточка по указанному id не найдена'));
      } else if (card.owner.id !== req.user._id) {
        next(new ForbiddenError('Удаление чужих карточек запрещено'));
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError('Карточка по указанному id не найдена'));
      } else {
        next(new InternalServerError('Произошла ошибка'));
      }
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
    } else {
      return res.send({ data: card });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new NotFoundError('Карточка по указанному id не найдена'));
    } else {
      next(new InternalServerError('Произошла ошибка'));
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) {
      next(new NotFoundError('Карточка по указанному id не найдена'));
    } {
      return res.send({ data: card });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new BadRequestError(`Переданы некорректные данные: ${err}`));
    } else {
      next(new InternalServerError('Произошла ошибка'));
    }
  });
