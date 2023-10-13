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
};
