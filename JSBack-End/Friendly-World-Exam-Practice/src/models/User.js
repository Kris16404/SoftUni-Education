const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.path('email').validate(function (email) {
  const dbEmail = mongoose.model('User').findOne({ email: email });
  return !!dbEmail;
}, 'Email already exist');

// userSchema.virtual('rePass').set(function (v) {
//   if (v !== this.password) {
//     throw new Error('Passwords dont match');
//   }
// });

userSchema.pre('save', async function () {
  const hashedPass = await bcrypt.hash(this.password, 10);
  this.password = hashedPass;
});

const User = mongoose.model('User', userSchema);
module.exports = User;
