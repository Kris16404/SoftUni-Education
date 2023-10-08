const express = require('express');
const path = require('path');
const { execArgv } = require('process');

const expressConfig = (app) => {
  const staticFiles = express.static(path.resolve(__dirname, '../static'));
  const urlEncoded = express.urlencoded({ extended: false });
  app.use(staticFiles);
  app.use(urlEncoded);
};

module.exports = expressConfig;
