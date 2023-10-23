const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: [5, 'Username is too short in schema'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: [10, 'Invalid email'],
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.virtual('rePass').set(function (rePass) {
  if (this.password !== rePass) {
    throw new Error(`Passwords don't match`);
  }
  if (rePass.length < 4) {
    throw new Error(`Password is too short`);
  }
});

userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;
