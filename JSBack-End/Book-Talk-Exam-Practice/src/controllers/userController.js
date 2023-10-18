const router = require('express').Router();

const userService = require('../services/userService.js');

router.get('/register', (req, res) => {
  const token = req.cookies['token'];
  res.render('register', { token });
});

router.post('/register', async (req, res) => {
  const { email, username, password, rePass } = req.body;
  try {
    const token = await userService.register(email, username, password, rePass);
    res.cookie('token', token);
    res.redirect('/');
  } catch (err) {
    const errorMessages = [err.message];
    res.render('register', { errorMessages });
  }
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password);
    res.cookie('token', token);
    res.redirect('/');
  } catch (err) {
    const errorMessages = [err.message];
    res.render('login', { errorMessages });
  }
});

router.get('/logout', async (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
