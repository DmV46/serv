const routerCards = require('express').Router();

const auth = require('../middlewares/auth');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('/cards', auth, getCards);
routerCards.post('/cards', auth, createCard);
routerCards.delete('/cards/:id', auth, deleteCard);
routerCards.put('/cards/:id/likes', auth, likeCard);
routerCards.delete('/cards/:id/likes', auth, dislikeCard);

module.exports = routerCards;
