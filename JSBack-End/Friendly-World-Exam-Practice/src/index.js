const express = require('express');
const mongoose = require('mongoose');

const { PORT, DB_CONNECTION_STRING } = require('./constants.js');
const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const routes = require('./router.js');

const app = express();

expressConfig(app);
handlebarsConfig(app);

async function dbConnect() {
  await mongoose.connect(DB_CONNECTION_STRING);
}

dbConnect()
  .then(() => console.log('Successfully connected to DB'))
  .catch((err) => {
    console.log(`Failed to connect to DB | Error: ${err}`);
  });

app.use(routes);

app.listen(PORT, () => console.log(`The server is listening on port: ${PORT}`));
