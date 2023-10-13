const router = require('express').Router();

const userService = require('../services/userService.js');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  let { email, password } = req.body;

  try {
    await userService.login(email, password);
    res.redirect('/');
  } catch (err) {
    console.log(err.message);
    res.redirect('/users/login');
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  let { email, password, rePass } = req.body;

  if (password !== rePass) {
    throw new Error('Passwords do not match');
  }
  try {
    await userService.register(email, password);
    res.redirect('/');
  } catch (err) {
    console.log(err.message);
    res.redirect('/users/register');
  }
});

module.exports = router;
