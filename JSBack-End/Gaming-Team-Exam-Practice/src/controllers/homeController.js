const router = require('express').Router();

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

  res.render('create', { token });
});

router.get('/404', (req, res) => {
  const token = req.cookies['token'];

  res.render('404', { token });
});

module.exports = router;
