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

exports.login = async (email, password) => {
  const user = await User.find({ email: email });

  if (!user[0]) {
    throw new Error('Wrong email or password');
  }

  const isValid = await bcrypt.compare(password, user[0].password);
  if (!isValid) {
    throw new Error('Wrong email or password');
  }
};
