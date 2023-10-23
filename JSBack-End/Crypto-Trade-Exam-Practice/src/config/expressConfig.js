const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const routes = require('../utils/routes.js');
const { auth } = require('../middlewares/auth.js');

exports.expressConfig = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use(cookieParser());
  app.use(auth);
  app.use(routes);
};
