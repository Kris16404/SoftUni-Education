const express = require('express');
const app = express();
const { PORT } = require('./Constants.js');

app.listen(PORT, console.log(`The server is listening on port ${PORT}`));
