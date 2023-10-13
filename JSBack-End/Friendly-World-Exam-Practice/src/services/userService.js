const { SECRET } = require('../constants.js');
const jwt = require('../lib/jwt.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

exports.register = (email, password, rePass) =>
  User.create({ email, password, rePass });

exports.login = async (email, password) => {
  const user = await User.findOne({ email: email });

  if (!user) {
    throw new Error('Invalid email or password!');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Invalid email or password!');
  }

  const payload = { _id: user.id, email: user.email };

  const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

  return token;
};
