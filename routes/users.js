const routerUser = require('express').Router();

const users = require('../data/users');

const getUsers = (req, res) => {
  res.send(users);
};

const getUser = (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item._id === id);
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  res.send(user);
};

routerUser.get('/users/:id', getUser);
routerUser.get('/users', getUsers);

module.exports = routerUser;
