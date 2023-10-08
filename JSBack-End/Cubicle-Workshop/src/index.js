const express = require('express');
const app = express();
const { PORT } = require('./Constants.js');
const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');

expressConfig(app);
handlebarsConfig(app);

app.listen(PORT, console.log(`The server is listening on port ${PORT}`));
