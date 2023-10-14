const express = require('express');

const { PORT } = require('./utils/constants.js');

const app = express();

app.listen(PORT, () => console.log(`The app is listening on port : ${PORT}`));
