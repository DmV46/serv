const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ITEM_NOT_FOUND, SERVER_ERROR } = require('../configuration/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../models/user');

const login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: SERVER_ERROR }));
};

const getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(404).send({ message: ITEM_NOT_FOUND }));
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
    .then((user) => {
      res.status(201).send({
        user: {
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

const patchUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      if (req.user._id !== user._id) {
        return Promise.reject(new Error('Отсутствуют права на редактирование!'));
      }
      return User.findByIdAndRemove(req.user._id, { name, about }, { new: true });
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(401).send({ message: err.message }));

  // User.findByIdAndUpdate(req.user._id, { name, about }, { new: true })
  //   .then((user) => res.send({ data: user }))
  //   .catch((err) => res.status(500).send({ message: err.message }));
};

const patchUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findById(req.user._id)
    .then((user) => {
      if (req.user._id !== user._id) {
        return Promise.reject(new Error('Отсутствуют права на редактирование!'));
      }
      return User.findByIdAndUpdate(req.user._id, { avatar }, { new: true });
    })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: SERVER_ERROR }));

  // User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
  //   .then((user) => res.send({ data: user }))
  //   .catch(() => res.status(500).send({ message: SERVER_ERROR }));
};


module.exports = {
  login, getUsers, getUser, createUser, patchUserProfile, patchUserAvatar,
};
