const express = require('express');

const { PORT } = require('./constants.js');
const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');

const app = express();

expressConfig(app);
expressConfig(app);

app.listen(PORT, () => console.log(`The server is listening on port: ${PORT}`));
