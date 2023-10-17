const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (val) {
        return val.length > 10;
      },
    },
  },
  username: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val.length > 4;
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
