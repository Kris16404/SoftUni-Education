const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jwt.js');
const { SECRET } = require('../utils/constants.js');

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  const user = await User.findOne({ email: email }).exec();
  if (!user) {
    throw new Error('Wrong email or password');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Wrong email or password');
  }

  const payload = {
    _id: user.id,
    email: user.email,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

  return token;
};

exports.register = async (username, email, password, rePass) => {
  if ((!username, !email, !password, !rePass)) {
    throw new Error(`All fields are rquired`);
  }
  if (password !== rePass) {
    throw new Error(`Passwords don't match`);
  }
  if (username.length < 5) {
    throw new Error(`Username must be at least 5 characters long`);
  }
  if (email.length < 10) {
    throw new Error(`Email must be at least 10 characters long`);
  }
  if (password.length < 4) {
    throw new Error(`Password must be at least 4 characters long`);
  }

  const checkForExistingEmail = await User.findOne({ email: email }).exec();
  if (checkForExistingEmail) {
    throw new Error('And user with this email already exists');
  }

  const hash = await bcrypt.hash(password, 10);

  const userObj = {
    username: username,
    email: email,
    password: hash,
  };

  const user = new User(userObj);
  await user.save();

  const currentUser = await User.findOne({ email: email }).exec();

  const payload = {
    _id: currentUser.id,
    email: currentUser.email,
  };

  const token = jwt.sign(payload, SECRET, { expiresIn: '2d' });

  return token;
};
