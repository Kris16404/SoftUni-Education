const bcrypt = require('bcrypt');

const User = require('../models/User.js');

exports.register = async (email, username, password, rePass) => {
  // TODO: Validate input

  const userTemplate = {
    email: email,
    username: username,
    password: await bcrypt.hash(password, 10),
  };

  const user = new User(userTemplate);

  await user.save();
};
