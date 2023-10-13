const express = require('express');

const { PORT } = require('./constants.js');

const app = express();

app.listen(PORT, () => console.log(`The server is listening on port: ${PORT}`));
