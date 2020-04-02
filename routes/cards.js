const routerCards = require('express').Router();

const auth = require('../middlewares/auth');
const {
  checkCard, checkId,
} = require('../modules/validation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routerCards.get('/cards', auth, getCards);
routerCards.post('/cards', auth, checkCard, createCard);
routerCards.delete('/cards/:id', auth, checkId, deleteCard);
routerCards.put('/cards/:id/likes', auth, checkId, likeCard);
routerCards.delete('/cards/:id/likes', auth, checkId, dislikeCard);

module.exports = routerCards;
