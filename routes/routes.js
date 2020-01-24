const createError = require('http-errors');
const routes = require('express').Router();
const { getUsers, getUser } = require('./users');
const getCards = require('./cards');

routes.get('/users/:id', getUser);
routes.get('/users', getUsers);
routes.get('/cards', getCards);
routes.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  // next(createError(404, 'Запрашиваемый ресурс не найден'))
});

module.exports = routes;
