const express = require('express');
const path = require('path');

const routes = require('../utils/routes.js');

exports.expressConfig = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use(routes);
};
