const router = require('express').Router();

const gameService = require('../services/gameService.js');

router.get('/', (req, res) => {
  const token = req.cookies['token'];

  res.render('home', { token });
});

router.get('/catalog', async (req, res) => {
  const token = req.cookies['token'];
  const games = await gameService.findAllGames();

  res.render('catalog', { token, games });
});

router.get('/create', (req, res) => {
  const token = req.cookies['token'];
  if (!token) {
    res.redirect('/users/login');
  }

  res.render('create', { token });
});

router.post('/create', async (req, res) => {
  const { platform, name, image, price, genre, description } = req.body;
  const owner = res.locals.user._id;
  try {
    await gameService.createGame(
      platform,
      name,
      image,
      price,
      genre,
      description,
      owner
    );
    res.redirect('/');
  } catch (err) {
    const errorMessages = [err.message];
    const token = req.cookies['token'];
    res.render('create', { token, errorMessages });
  }
});

router.get('/details/:id', async (req, res) => {
  const token = req.cookies['token'];
  const isLogged = token;
  const id = req.params.id;
  const user = res.locals.user;
  const game = await gameService.findGameById(id);

  let isAuthor;
  let isLoggedAndBought;
  if (user) {
    isAuthor = user._id === game.owner;
    isLoggedAndBought = !game.boughtBy.includes(user._id);
  } else {
    isAuthor = false;
    isLoggedAndBought = false;
  }

  res.render('details', { token, game, isLogged, isAuthor, isLoggedAndBought });
});

router.get('/buy/:id', async (req, res) => {
  const userId = res.locals.user._id;
  const gameId = req.params.id;
  await gameService.buyAGame(userId, gameId);
  res.redirect(`/details/${gameId}`);
});

router.get('/edit/:id', async (req, res) => {
  const token = req.cookies['token'];
  const gameId = req.params.id;
  const game = await gameService.findGameById(gameId);
  const isPC = game.platform === 'PC';
  const isNintendo = game.platform === 'Nintendo';
  const isPS4 = game.platform === 'PS4';
  const isPS5 = game.platform === 'PS5';
  const isXbox = game.platform === 'XBOX';

  res.render('edit', { token, game, isPC, isNintendo, isPS4, isPS5, isXbox });
});

router.post('/edit/:id', async (req, res) => {
  const { platform, name, image, price, genre, description } = req.body;
  const gameId = req.params.id;
  const token = req.cookies['token'];

  try {
    await gameService.editGame(
      platform,
      name,
      image,
      price,
      genre,
      description,
      gameId
    );

    res.redirect(`/details/${gameId}`);
  } catch (err) {
    const game = await gameService.findGameById(gameId);
    const isPC = game.platform === 'PC';
    const isNintendo = game.platform === 'Nintendo';
    const isPS4 = game.platform === 'PS4';
    const isPS5 = game.platform === 'PS5';
    const isXbox = game.platform === 'XBOX';
    const errorMessages = [err.message];
    res.render('edit', {
      token,
      game,
      isPC,
      isNintendo,
      isPS4,
      isPS5,
      isXbox,
      errorMessages,
    });
  }
});

router.get('/delete/:id', async (req, res) => {
  const gameId = req.params.id;

  await gameService.deleteGameById(gameId);

  res.redirect('/catalog');
});

router.get('/search', async (req, res) => {
  const token = req.cookies['token'];
  const games = await gameService.findAllGames();
  res.render('search', { token, games });
});

router.post('/search', async (req, res) => {
  const token = req.cookies['token'];
  const { search, platform } = req.body;

  const games = await gameService.searchGames(search, platform);

  res.render('search', { token, games });
});

router.get('/404', (req, res) => {
  const token = req.cookies['token'];

  res.render('404', { token });
});

module.exports = router;
