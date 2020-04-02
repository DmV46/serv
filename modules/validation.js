const { celebrate, Joi } = require('celebrate');

// //////////////////////////////////
// /                              ///
// /        Validation User       ///
// /                              ///
// //////////////////////////////////


const checkLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const checkId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

const checkUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const checkProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const checkAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
});

// //////////////////////////////////
// /                              ///
// /        Validation Card       ///
// /                              ///
// //////////////////////////////////

const checkCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
});

module.exports = {
  checkId, checkUser, checkLogin, checkProfile, checkAvatar, checkCard,
};
