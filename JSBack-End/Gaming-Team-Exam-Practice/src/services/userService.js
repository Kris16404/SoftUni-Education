const User = require('../models/User.js');
const bcrypt = require('bcrypt');

exports.login = (email, password) => {
  //
};

exports.register = async (username, email, password, rePass) => {
  if (password !== rePass) {
    throw new Error(`Passwords don't match`);
  }

  const checkForExistingEmail = User.findOne({ email: email });

  if (!checkForExistingEmail) {
    throw new Error('And user with this email already exists');
  }

  const hash = await bcrypt.hash(password, 10);

  const userObj = {
    username: username,
    email: email,
    password: hash,
  };

  const user = new User(userObj);

  user.save();
};
