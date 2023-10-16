const express = require('express');

const { expressConfig } = require('./config/expressConfig.js');
const { handlebarsConfig } = require('./config/handlebarsConfig.js');
const { PORT } = require('./utils/constants.js');

const app = express();

handlebarsConfig(app);
expressConfig(app);

app.listen(PORT, () => console.log(`The Server Is Listening On Port: ${PORT}`));
