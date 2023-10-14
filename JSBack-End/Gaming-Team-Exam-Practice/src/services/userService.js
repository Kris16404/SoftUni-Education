const User = require('../models/User.js');
const bcrypt = require('bcrypt');

exports.login = (email, password) => {
  //
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

  // TODO: Make cookie token
};
