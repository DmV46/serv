const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NotFoundError, UnauthorizedError, ForbiddenError } = require('../errors/NotFoundError');
const { ITEM_NOT_FOUND, UNAUTHORIZED_ERROR} = require('../configuration/constants');

const { JWT_SECRET } = require('../configuration/settings');
const User = require('../models/user');

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch( next(new UnauthorizedError(UNAUTHORIZED_ERROR)) );
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(()=>{
      throw new NotFoundError(ITEM_NOT_FOUND);
    })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({ data: user.omitPrivate() }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: SERVER_ERROR }));
};


module.exports = {
  login, getUsers, getUser, createUser, patchUserProfile, patchUserAvatar,
};
