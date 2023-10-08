const router = require('express').Router();
const cubeService = require('../services/cubeService.js');

router.get('/', (req, res) => {
  cubes = cubeService.getAllCubes();
  res.render('index', { cubes });
});

router.get('/create', (req, res) => {
  res.render('create');
});

router.post('/create', (req, res) => {
  const { name, description, imageUrl, difficultyLevel } = req.body;
  cubeService.createCube(name, description, imageUrl, difficultyLevel);
  res.redirect('/');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/details/:id', (req, res) => {
  const id = req.params.id;
  const allCubes = cubeService.getAllCubes();

  const cube = allCubes.find((cube) => (cube.id = id));

  res.render('details', { cube });
});

router.get('/404', (req, res) => {
  res.render('404');
});

router.get('*', (req, res) => {
  res.redirect('/404');
});

module.exports = router;
