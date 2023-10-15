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

exports.findAllGames = async () => {
  const allGames = await Game.find().lean().exec();
  return allGames;
};

exports.findGameById = async (id) => {
  const foundGame = await Game.findById(id).lean().exec();

  return foundGame;
};

exports.buyAGame = async (userId, gameId) => {
  await Game.findByIdAndUpdate(gameId, {
    $push: { boughtBy: userId },
  });
};

exports.editGame = async (
  platform,
  name,
  image,
  price,
  genre,
  description,
  gameId
) => {
  if (!platform || !name || !image || !price || !genre || !description) {
    throw new Error('All fields are required');
  }

  const updatedGame = {
    name: name,
    image: image,
    price: price,
    description: description,
    genre: genre,
    platform: platform,
  };

  await Game.findByIdAndUpdate(gameId, updatedGame);
};
