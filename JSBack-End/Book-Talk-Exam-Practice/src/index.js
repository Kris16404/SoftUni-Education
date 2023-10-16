const express = require('express');

const { expressConfig } = require('./config/expressConfig.js');
const { PORT } = require('./utils/constants.js');

const app = express();

expressConfig(app);

app.listen(PORT, () => console.log(`The Server Is Listening On Port: ${PORT}`));
