const router = require('express').Router();

router.get('/', (req, res) => {
  const token = req.cookies['token'];
  const locals = res.locals;
  console.log(locals);
  res.render('home', { token });
});

router.get('/404', (req, res) => {
  res.render('404');
});

module.exports = router;
