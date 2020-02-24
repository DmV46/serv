const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const {
    name, link, owner, likes, createAt,
  } = req.body;

  Card.create({
    name, link, owner, likes, createAt,
  })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (req.user._id !== card.owner._id) {
        return Promise.reject(new Error('Отсутствуют права на редактирование!'));
      }
      return Card.findByIdAndRemove(req.params.id);
    })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
  // Card.findByIdAndRemove(req.params.id)
  //   .then((card) => res.send({ data: card }))
  //   .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка. Изменения не внесены.' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка. Изменения не внесены.' }));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
