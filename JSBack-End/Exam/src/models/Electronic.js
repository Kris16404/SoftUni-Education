const mongoose = require('mongoose');

const electronicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [10, 'Name must be at least 10 characters'],
  },
  type: {
    type: String,
    required: true,
    minLength: [2, 'Type must be at least 2 characters'],
  },
  damages: {
    type: String,
    required: true,
    minLength: [10, 'Damages must be at least 10 characters'],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return val.startsWith('http://') || val.startsWith('https://');
      },
    },
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description must be at leaast 10 characters'],
    maxLength: [200, 'Maximum allowed description characters are 200'],
  },
  production: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        if (val < 1900 || val > 2023) {
          throw new Error('Year of production must be between 1900 and 2023');
        }
      },
    },
  },
  exploitation: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        if (val < 0) {
          throw new Error('Years of exploitation must be a positive number');
        }
      },
    },
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        if (val < 0) {
          throw new Error('Price must be a positive number');
        }
      },
    },
  },
  buyingList: {
    type: [mongoose.Types.ObjectId],
    ref: 'User',
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const Electronic = mongoose.model('Electronic', electronicSchema);

module.exports = Electronic;
