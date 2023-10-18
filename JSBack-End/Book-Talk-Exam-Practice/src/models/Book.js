const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
  },
  author: {
    type: String,
    required: true,
    minLength: 5,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return !val.startsWith('http://') && !val.startsWith('https://');
      },
    },
  },
  bookReview: {
    type: String,
    required: true,
    minLength: 10,
  },
  genre: {
    type: String,
    required: true,
    minLength: 3,
  },
  stars: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        return val < 1 || val > 5;
      },
    },
  },
  wishingList: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
