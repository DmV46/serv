const mongoose = require('mongoose');
const validator = require('validator');

const { INVALID_LINK } = require('../configuration/constants');


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    // validate: {
    //   validator: () => validator.isURL, INVALID_LINK,
    // },
  },
});

userSchema.path('avatar').validate(validator.isURL, INVALID_LINK);

userSchema.pre('findOneAndUpdate', function (next) {
  this.options.runValidators = true;
  next();
});

module.exports = mongoose.model('user', userSchema);
