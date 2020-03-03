const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с таким id не найдена' });
      }

      if (!card.owner.equals(req.user._id)) {
        return res.status(403).send({ message: 'Отсутствуют права на редактирование!' });
      }

      return Card.remove(req.params.id)
        .then(() => res.send(card));
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с таким id не найдена' });
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка. Изменения не внесены.' }));
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Карточка с таким id не найдена' });
      }
      return res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка. Изменения не внесены.' }));
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
