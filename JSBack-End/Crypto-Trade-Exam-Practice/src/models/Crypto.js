const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'Name is too short'],
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description is too short'],
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  buyCrypto: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

cryptoSchema.path('price').validate(function () {
  if (this.price < 0) {
    throw new Error('Price should be a positive number');
  }
});

cryptoSchema.path('image').validate(function () {
  if (!this.image.startsWith('http://') && !this.image.startsWith('https://')) {
    throw new Error('Price should be a positive number');
  }
});

cryptoSchema.path('paymentMethod').validate(function () {
  if (
    this.paymentMethod !== 'crypto-wallet' &&
    this.paymentMethod !== 'credit-card' &&
    this.paymentMethod !== 'debit-card' &&
    this.paymentMethod !== 'paypal'
  ) {
    throw new Error('Invalid payment method');
  }
});

const Crypto = mongoose.model('Crypto', cryptoSchema);

module.exports = Crypto;
