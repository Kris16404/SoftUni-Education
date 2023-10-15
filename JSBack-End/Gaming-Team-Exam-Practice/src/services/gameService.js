const Game = require('../models/Game.js');

exports.createGame = async (
  platform,
  name,
  image,
  price,
  genre,
  description,
  owner
) => {
  if (!platform || !name || !image || !price || !genre || !description) {
    throw new Error('All fields are required');
  }

  const gameTemplate = {
    name: name,
    image: image,
    price: price,
    description: description,
    genre: genre,
    platform: platform,
    owner: owner,
  };

  const game = new Game(gameTemplate);
  await game.save();
};
