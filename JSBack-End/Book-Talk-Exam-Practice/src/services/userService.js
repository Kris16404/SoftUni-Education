const bcrypt = require('bcrypt');

const User = require('../models/User.js');
const jwt = require('../lib/jwt.js');
const { SECRET } = require('../utils/constants.js');

exports.register = async (email, username, password, rePass) => {
  if (email.length < 10) {
    throw new Error('Passwords Or Email Do Not Match');
  }
  if (username.length < 4) {
    throw new Error('Username should be at least 4 characters');
  }
  if (password.length < 3) {
    throw new Error('Passwords Or Email Do Not Match');
  }
  if (password !== rePass) {
    throw new Error('Passwords Or Email Do Not Match');
  }

  const checkIfExists = await User.findOne({ email: email }).lean().exec();
  if (checkIfExists) {
    throw new Error('An user with this email alrady exists');
  }

  const userTemplate = {
    email: email,
    username: username,
    password: await bcrypt.hash(password, 10),
  };

  const user = new User(userTemplate);

  await user.save();

  const currentUser = await User.findOne({ email: email }).lean().exec();

  const payload = {
    _id: currentUser._id,
    email: currentUser.email,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

  return token;
};

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Invalid password or email');
  }

  const user = await User.findOne({ email: email }).lean().exec();

  if (!user) {
    throw new Error('Invalid password or email');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Invalid password or email');
  }

  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

  return token;
};
