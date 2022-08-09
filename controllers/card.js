const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(404)
          .send({ message: "Карточка по указанному id не найдена" });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
};

module.exports.likeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: "Карточка по указанному id не найдена" });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });

module.exports.dislikeCard = (req, res) =>
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((card) => {
      if (!card) {
        return res
          .status(404)
          .send({ message: "Карточка по указанному id не найдена" });
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({
          message: "Переданы некорректные данные",
        });
      } else if (err.name === "CastError") {
        return res
          .status(404)
          .send({ message: "Карточка по указанному id не найдена" });
      }
      return res.status(500).send({ message: "Произошла ошибка" });
    });
