const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
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
    trim: true,
  },
  genre: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        if (
          val !== 'PC' &&
          val !== 'Nintendo' &&
          val !== 'PS4' &&
          val !== 'PS5' &&
          val !== 'XBOX'
        ) {
          return false;
        }
        return true;
      },
    },
  },
  boughtBy: [String],
  owner: {
    type: String,
  },
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
