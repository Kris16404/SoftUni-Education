const jwt = require('../lib/jwt.js');
const { SECRET } = require('../constants.js');

exports.auth = async function (req, res, next) {
  const token = req.cookies['token'];
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      return next();
    } catch (err) {
      res.clearCookie('token');
      res.redirect('/users/login');
    }
  }
  return next();
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/users/login');
  }

  next();
};
