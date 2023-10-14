const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val.length >= 5;
      },
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val.length >= 10;
      },
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val.length >= 4;
      },
    },
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
