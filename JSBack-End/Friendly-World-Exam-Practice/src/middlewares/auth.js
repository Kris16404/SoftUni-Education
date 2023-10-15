const jwt = require('../lib/jwt.js');
const { SECRET } = require('../constants.js');
const extractMongooseErrors = require('../errorHandler.js');

exports.auth = async function (req, res, next) {
  const token = req.cookies['token'];
  console.log('log from middleware');
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      return next();
    } catch (err) {
      const errorMessage = extractMongooseErrors(err);
      res.status(404).render('login', { errorMessage });
      res.clearCookie('token');
    }
  } else {
    return next();
  }
};

exports.isAuth = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/users/login');
  }

  next();
};
