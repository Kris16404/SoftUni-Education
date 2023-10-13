const router = require('express').Router();

const userService = require('../services/userService.js');
const extractMongooseErrors = require('../errorHandler.js');

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  let { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    res.cookie('token', token);
    res.redirect('/');
  } catch (err) {
    const errorMessages = extractMongooseErrors(err);
    res.status(404).render('login', { errorMessages });
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  let { email, password, rePass } = req.body;

  try {
    await userService.register(email, password, rePass);
    res.redirect('/');
  } catch (err) {
    const errorMessages = extractMongooseErrors(err);
    res.status(404).render('register', { errorMessages });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
