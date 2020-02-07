const routerUser = require('express').Router();

const {
  getUsers, getUser, createUser, patchUserProfile, patchUserAvatar,
} = require('../controllers/users');

routerUser.get('/users', getUsers);
routerUser.get('/users/:id', getUser);
routerUser.post('/users', createUser);
routerUser.patch('/users/me', patchUserProfile);
routerUser.patch('/users/me/avatar', patchUserAvatar);

module.exports = routerUser;
