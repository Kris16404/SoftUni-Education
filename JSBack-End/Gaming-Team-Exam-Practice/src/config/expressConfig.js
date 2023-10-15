const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('../utils/routes.js');
const middlewares = require('../middlewares/authenticiaton.js');

exports.expressConfig = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use(cookieParser());
  app.use(routes);
  app.use(middlewares.auth);
};
