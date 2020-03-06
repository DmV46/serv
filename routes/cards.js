const routerCards = require('express').Router();

const cards = require('../data/cards');

const getCards = (req, res) => {
  res.send(cards);
};

routerCards.get('/cards', auth, getCards);
routerCards.post('/cards', auth, createCard);
routerCards.delete('/cards/:id', auth, deleteCard);
routerCards.put('/cards/:id/likes', auth, likeCard);
routerCards.delete('/cards/:id/likes', auth, dislikeCard);

module.exports = routerCards;
