const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

exports.register = async (email, password) => {
  const user = new User({
    email: email,
    password: await bcrypt.hash(password, 10),
  });

  await user.save();
};
