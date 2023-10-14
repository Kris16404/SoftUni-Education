const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const middlewares = require('../middlewares/auth.js');

const expressConfig = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use(cookieParser());
  app.use(middlewares.auth);
};

module.exports = expressConfig;
