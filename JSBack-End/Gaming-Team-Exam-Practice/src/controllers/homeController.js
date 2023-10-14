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

module.exports = router;
