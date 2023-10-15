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
  if (
    platform !== 'PC' &&
    platform !== 'Nintendo' &&
    platform !== 'PS4' &&
    platform !== 'PS5' &&
    platform !== 'XBOX'
  ) {
    throw new Error('Platform is required');
  }
  if (name.length < 4) {
    throw new Error('Game name must be at least 4 characters long');
  }
  if (!image.startsWith('http://') && !image.startsWith('https://')) {
    throw new Error('Game image must start with http:// or https://');
  }
  if (Number(price) < 0) {
    throw new Error('Game price must be positive number');
  }
  if (genre.length < 2) {
    throw new Error('Game genre must be at least 2 characters long');
  }
  if (description.trim().length < 10) {
    throw new Error('Game description must be at least 10 characters long');
  }
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
  if (
    platform !== 'PC' &&
    platform !== 'Nintendo' &&
    platform !== 'PS4' &&
    platform !== 'PS5' &&
    platform !== 'XBOX'
  ) {
    throw new Error('Platform is required');
  }
  if (name.length < 4) {
    throw new Error('Game name must be at least 4 characters long');
  }
  if (!image.startsWith('http://', 0) && !image.startsWith('https://', 0)) {
    throw new Error('Game image must start with http:// or https://');
  }
  if (Number(price) < 0) {
    throw new Error('Game price must be positive number');
  }
  if (genre.length < 2) {
    throw new Error('Game genre must be at least 2 characters long');
  }
  if (description.trim().length < 10) {
    throw new Error('Game description must be at least 10 characters long');
  }
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

exports.deleteGameById = async (gameId) => {
  await Game.findByIdAndDelete(gameId);
};

exports.searchGames = async (search, platform) => {
  let games = await this.findAllGames();

  if (search) {
    games = games.filter((game) =>
      game.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (platform) {
    games = games.filter((game) => game.platform === platform);
  }

  return games;
};
