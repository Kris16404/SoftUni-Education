const router = require('express').Router();

const cubeController = require('./controllers/cubeController.js');

router.use(cubeController);

module.exports = router;
