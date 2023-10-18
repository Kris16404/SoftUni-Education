const router = require('express').Router();

const bookService = require('../services/bookService.js');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/catalog', async (req, res) => {
  const books = await bookService.getAllBooks();

  res.render('catalog', { books });
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', async (req, res) => {
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
    res.render('create', { errorMessages });
  }
});

router.get('/details/:id', async (req, res) => {
  const bookId = req.params.id;
  const userId = req.user?._id;
  const book = await bookService.findBookById(bookId);
  const isAuthor = book.owner.toString() === userId;
  const isWished = book.wishingList.includes(userId);

  res.render('details', { book, isAuthor, isWished });
});

router.get('/404', (req, res) => {
  res.render('404');
});

module.exports = router;
