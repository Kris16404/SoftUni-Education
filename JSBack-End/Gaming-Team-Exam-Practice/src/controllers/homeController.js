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

router.get('/404', (req, res) => {
  const token = req.cookies['token'];

  res.render('404', { token });
});

module.exports = router;
