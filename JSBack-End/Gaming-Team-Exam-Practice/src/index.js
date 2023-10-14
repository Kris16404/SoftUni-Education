const express = require('express');

const { PORT } = require('./utils/constants.js');
const { expressConfig } = require('./config/expressConfig.js');
const { handlebarsConfig } = require('./config/handlebarsConfig.js');

const app = express();

handlebarsConfig(app);
expressConfig(app);

app.listen(PORT, () => console.log(`The app is listening on port : ${PORT}`));
