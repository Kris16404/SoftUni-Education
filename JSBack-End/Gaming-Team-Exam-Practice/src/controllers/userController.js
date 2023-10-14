const router = require('express').Router();

const userServie = require('../services/userService.js');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, email, password, rePass } = req.body;
  try {
    const token = await userServie.register(username, email, password, rePass);
    res.cookie('token', token);
    res.redirect('/');
  } catch (err) {
    errorMessages = [err.message];
    res.render('register', { errorMessages });
  }
});

module.exports = router;
