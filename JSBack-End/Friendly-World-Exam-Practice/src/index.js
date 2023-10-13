const express = require('express');

const { PORT } = require('./constants.js');
const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const routes = require('./router.js');

const app = express();

expressConfig(app);
handlebarsConfig(app);

app.use(routes);

app.listen(PORT, () => console.log(`The server is listening on port: ${PORT}`));
