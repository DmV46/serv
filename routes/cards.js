const cards = require('../data/cards');

const getCards = (req, res) => {
  res.send(cards);
};

module.exports = getCards;
