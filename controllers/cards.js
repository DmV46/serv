const Card = require('../models/card');
const { NotFoundError, ForbiddenError } = require('../errors/NotFoundError');
const { ITEM_NOT_FOUND, FORBIDDEN_ERROR } = require('../configuration/constants')

const getCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

const createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findById({ _id: id })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(ITEM_NOT_FOUND);
      }

      if (!card.owner.equals(req.user._id)) {
        throw new ForbiddenError(FORBIDDEN_ERROR);
      }

      return Card.remove(card)
        .then(() => res.send(card));
    })
    .catch(next);
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(()=>{
      throw new NotFoundError(ITEM_NOT_FOUND);
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(()=>{
      throw new NotFoundError(ITEM_NOT_FOUND);
    })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
