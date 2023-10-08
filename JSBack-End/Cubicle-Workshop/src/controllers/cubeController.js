const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/404', (req, res) => {
  res.render('404');
});

router.get('*', (req, res) => {
  res.redirect('/404');
});

module.exports = router;
