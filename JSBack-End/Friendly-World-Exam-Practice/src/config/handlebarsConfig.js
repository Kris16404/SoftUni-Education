const handlebars = require('express-handlebars');

const handlebarsConfig = (app) => {
  app.engine('hbs', handlebars.engine('hbs'));
  app.set('view engine', 'hbs');
  app.set('views', 'src/views');
};

module.exports = handlebarsConfig;
