const routerCards = require('express').Router();

const cards = require('../data/cards');

const getCards = (req, res) => {
  res.send(cards);
};

routerCards.get('/cards', getCards);

module.exports = routerCards;
