const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, min: 5 },
  email: { type: String, required: true, min: 10 },
  password: { type: String, required: true, min: 4 },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
