const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const auth = require('../middlewares/auth.js');

const expressConfig = (app) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.resolve(__dirname, '../public')));
  app.use(cookieParser());
  app.use(async (req, res, next) => {
    const token = req.cookies['token'];
    if (token) {
      try {
        const decodedToken = await jwt.verify(token, SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.isAuthenticated = true;

        next();
      } catch (err) {
        res.clearCookie('token');
        res.redirect('/users/login');
      }
    }

    next();
  });
};

module.exports = expressConfig;
