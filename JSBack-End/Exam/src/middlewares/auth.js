const { SECRET } = require('../utils/constants.js');
const jwt = require('../lib/jwt.js');

exports.auth = async (req, res, next) => {
  const token = req.cookies['token'];
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      return next();
    } catch (err) {
      const errorMessages = [err.message];
      res.render('login', { errorMessages });
      res.clearCookie('token');
    }
  } else {
    return next();
  }
};

exports.isAuth = async (req, res, next) => {
  if (!req.user) {
    res.redirect('/users/login');
    return;
  }
  return next();
};
