const router = require('express').Router();

const cryptoService = require('../services/cryptoService.js');
const { isAuth } = require('../middlewares/auth.js');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/catalog', async (req, res) => {
  const cryptos = await cryptoService.getAllCryptos();
  res.render('catalog', { cryptos });
});

router.get('/create', isAuth, (req, res) => {
  res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
  const { name, image, price, description, payment } = req.body;
  const ownerId = req.user._id;
  try {
    await cryptoService.createCrypto(
      name,
      image,
      price,
      description,
      payment,
      ownerId
    );

    res.redirect('/catalog');
  } catch (err) {
    const errorMessages = [err.message];
    res.render('create', { errorMessages });
  }
});
router.get('/details/:id', async (req, res) => {
  const cryptoId = req.params.id;
  const userId = req.user._id;

  const crypto = await cryptoService.getCryptoById(cryptoId);
  const isAuthor = crypto.owner.toString() === userId;
  const isBought = crypto.buyCrypto.toString().includes(userId);

  res.render('details', { crypto, isAuthor, isBought });
});

router.get('/404', (req, res) => {
  res.render('404');
});

module.exports = router;
