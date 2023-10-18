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

router.get('/create', (req, res) => {
  const token = req.cookies['token'];

  res.render('create', { token });
});

router.post('/create', async (req, res) => {
  const token = req.cookies['token'];
  let { title, author, genre, stars, image, review } = req.body;
  stars = Number(stars);
  try {
    const ownerId = req.user._id;
    await bookService.createBook(
      title,
      author,
      genre,
      stars,
      image,
      review,
      ownerId
    );
    res.redirect('/catalog');
  } catch (err) {
    const errorMessages = [err.message];
    res.render('create', { token, errorMessages });
  }
});

router.get('/404', (req, res) => {
  const token = req.cookies['token'];

  res.render('404', { token });
});

module.exports = router;
