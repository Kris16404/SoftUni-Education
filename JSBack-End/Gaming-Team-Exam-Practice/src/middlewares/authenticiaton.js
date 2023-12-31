const jwt = require('../lib/jwt.js');
const { SECRET } = require('../utils/constants.js');

exports.auth = async (req, res, next) => {
  const token = req.cookies['token'];
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      return next();
    } catch (errorMessages) {
      res.render('login', { errorMessages });
      res.clearCookie('token');
    }
  } else {
    return next();
  }
};

exports.isAuth = (req, res, next) => {
  if (!res.user) {
    return res.redirect('/users/login');
  }

  return next();
};
