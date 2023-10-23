const User = require('../models/User.js');

const jwt = require('../lib/jwt.js');
const { SECRET } = require('../utils/constants.js');
const bcrypt = require('bcrypt');

exports.register = async (username, email, password, rePass) => {
  const userTemplate = {
    username: username,
    email: email,
    password: password,
    rePass: rePass,
  };
  try {
    const user = await User.create(userTemplate);
    const payload = {
      _id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });
    return token;
  } catch (err) {
    if (err?.code == 11000) {
      throw new Error('An user with this email alredy exists');
    }
    const isUsernameError = err?.errors?.username?.properties;
    const isEmailError = err?.errors?.email?.properties;
    if (isUsernameError) {
      throw new Error(isUsernameError.message);
    }
    if (isEmailError) {
      throw new Error(isEmailError.message);
    }
    throw err;
  }
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email: email }).lean().exec();

  if (!user) {
    throw new Error('Email or Password is incorrect');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Email or Password is incorrect');
  }

  const payload = {
    _id: user._id.toString(),
    username: user.username,
    email: user.email,
  };
  const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });
  return token;
};
