const router = require('express').Router();

const gameService = require('../services/gameService.js');

router.get('/', (req, res) => {
  const token = req.cookies['token'];

  res.render('home', { token });
});

router.get('/catalog', (req, res) => {
  const token = req.cookies['token'];

  res.render('catalog', { token });
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

router.get('/404', (req, res) => {
  const token = req.cookies['token'];

  res.render('404', { token });
});

module.exports = router;
