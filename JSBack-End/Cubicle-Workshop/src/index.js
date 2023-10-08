const express = require('express');
const app = express();
const { PORT } = require('./Constants.js');
const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const router = require('./router.js');

// Configure the app's engine and static files
expressConfig(app);
handlebarsConfig(app);

// Configure app's routes
app.use(router);

app.listen(PORT, console.log(`The server is listening on port ${PORT}`));
