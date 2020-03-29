const routerUser = require('express').Router();

const auth = require('../middlewares/auth');
const {
  checkId, checkUser, checkLogin, checkProfile, checkAvatar,
} = require('../modules/validation');
const {
  getUsers, getUser, createUser, patchUserProfile, patchUserAvatar, login,
} = require('../controllers/users');

routerUser.get('/users', auth, getUsers);
routerUser.get('/users/:id', auth, checkId, getUser); //

routerUser.post('/signin', checkLogin, login);
routerUser.post('/signup', checkUser, createUser); //

routerUser.patch('/users/me', auth, checkProfile, patchUserProfile);
routerUser.patch('/users/me/avatar', auth, checkAvatar, patchUserAvatar);

module.exports = routerUser;
