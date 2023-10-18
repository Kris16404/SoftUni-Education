const router = require('express').Router();

const bookService = require('../services/bookService.js');

router.get('/', (req, res) => {
  const token = req.cookies['token'];
  res.render('home', { token });
});

router.get('/catalog', async (req, res) => {
  const token = req.cookies['token'];
  const books = await bookService.getAllBooks();

  res.render('catalog', { token, books });
});

router.get('/404', (req, res) => {
  const token = req.cookies['token'];

  res.render('404', { token });
});

module.exports = router;
