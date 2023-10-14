const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/catalog', (req, res) => {
  res.render('catalog');
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.get('/404', (req, res) => {
  res.render('404');
});

module.exports = router;
