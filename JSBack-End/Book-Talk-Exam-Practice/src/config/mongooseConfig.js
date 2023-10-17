const mongoose = require('mongoose');

const { DB_STRING } = require('../utils/constants.js');

exports.dbConnect = async () => {
  try {
    await mongoose.connect(DB_STRING);
    console.log('Succesffully connected to the DB');
  } catch (err) {
    console.log(`Failed to connect to DB | ${err}`);
  }
};
