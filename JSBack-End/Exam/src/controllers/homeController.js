const router = require('express').Router();

const electronicService = require('../services/electronicService.js');
const { isAuth } = require('../middlewares/auth.js');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/catalog', async (req, res) => {
  const electronics = await electronicService.getAllElectronics();

  res.render('catalog', { electronics });
});

router.get('/create', isAuth, (req, res) => {
  res.render('create');
});

router.post('/create', isAuth, async (req, res) => {
  let {
    name,
    type,
    production,
    exploitation,
    damages,
    image,
    price,
    description,
  } = req.body;

  const ownerId = req.user._id;

  production = Number(production);
  exploitation = Number(exploitation);
  price = Number(price);

  try {
    await electronicService.createElectronic(
      name,
      type,
      production,
      exploitation,
      damages,
      image,
      price,
      description,
      ownerId
    );

    res.redirect('/catalog');
  } catch (err) {
    const errorMessages = [err.message];
    res.render('create', { errorMessages });
  }
});

router.get('/details/:electronicId', async (req, res) => {
  const electronicId = req.params.electronicId;
  const user = req?.user;

  const electronic = await electronicService.getElectronicById(electronicId);
  const isAuthor = electronic.owner.toString() === user?._id;
  const isBought = electronic.buyingList.toString().includes(user?._id);

  res.render('details', { electronic, isAuthor, isBought });
});

router.get('/edit/:electronicId', isAuth, async (req, res) => {
  const electronicId = req.params.electronicId;
  const electronic = await electronicService.getElectronicById(electronicId);
  const isAuthor = electronic.owner._id.toString() === req?.user?._id;
  if (!isAuthor) {
    res.redirect(`/details/${electronicId}`);
  } else {
    res.render('edit', { electronic });
  }
});

router.post('/edit/:electronicId', isAuth, async (req, res) => {
  const electronicId = req.params.electronicId;

  let {
    name,
    type,
    production,
    exploitation,
    damages,
    image,
    price,
    description,
  } = req.body;

  const electronic = await electronicService.getElectronicById(electronicId);

  const isAuthor = electronic.owner._id.toString() === req?.user?._id;

  if (!isAuthor) {
    res.redirect(`/details/${electronicId}`);
  } else {
    production = Number(production);
    exploitation = Number(exploitation);
    price = Number(price);

    try {
      await electronicService.updateElectronicById(
        name,
        type,
        production,
        exploitation,
        damages,
        image,
        price,
        description,
        electronicId
      );

      res.redirect(`/details/${electronicId}`);
    } catch (err) {
      const errorMessages = [err.message];
      res.render('edit', { electronic, errorMessages });
    }
  }
});

router.get('/delete/:electronicId', isAuth, async (req, res) => {
  const electronicId = req.params.electronicId;
  const electronic = await electronicService.getElectronicById(electronicId);

  const isAuthor = electronic.owner._id.toString() === req?.user?._id;

  if (!isAuthor) {
    res.redirect(`/details/${electronicId}`);
  } else {
    await electronicService.deleteElectronicById(electronicId);
    res.redirect('/catalog');
  }
});

router.get('/buy/:electronicId', isAuth, async (req, res) => {
  const electronicId = req.params.electronicId;
  const user = req.user;

  await electronicService.buyElectronic(electronicId, user);
  res.redirect(`/details/${electronicId}`);
});

router.get('/404', (req, res) => {
  res.render('404');
});

router.get('/search', isAuth, async (req, res) => {
  const result = await electronicService.getAllElectronics();
  res.render('search', { result });
});

router.post('/search', isAuth, async (req, res) => {
  const { searchName, searchType } = req.body;

  const result = await electronicService.searchElectronic(
    searchName,
    searchType
  );
  console.log(result);
  res.render('search', { result });
});

module.exports = router;
