const routerUser = require('express').Router();

const auth = require('../middlewares/auth');

const {
  getUsers, getUser, createUser, patchUserProfile, patchUserAvatar, login,
} = require('../controllers/users');

routerUser.get('/users', auth, getUsers);
routerUser.get('/users/:id', auth, getUser);

routerUser.post('/signin', login);
routerUser.post('/signup', createUser);

routerUser.patch('/users/me', auth, patchUserProfile);
routerUser.patch('/users/me/avatar', auth, patchUserAvatar);

module.exports = routerUser;
