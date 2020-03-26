const routerUser = require('express').Router();

const auth = require('../middlewares/auth');
const { CheckUserId, CheckCreateUser, CheckLogin } = require('../modules/validation');
const {
  getUsers, getUser, createUser, patchUserProfile, patchUserAvatar, login,
} = require('../controllers/users');

routerUser.get('/users', auth, getUsers);
routerUser.get('/users/:id', auth, CheckUserId, getUser); //

routerUser.post('/signin', CheckLogin, login);
routerUser.post('/signup', CheckCreateUser, createUser); //

routerUser.patch('/users/me', auth, patchUserProfile);
routerUser.patch('/users/me/avatar', auth, patchUserAvatar);

module.exports = routerUser;
