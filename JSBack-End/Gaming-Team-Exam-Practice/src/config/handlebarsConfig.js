const handlebars = require('express-handlebars');

exports.handlebarsConfig = (app) => {
  app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
  app.set('view enige', 'hbs');
  app.set('views', 'src/views');
};
