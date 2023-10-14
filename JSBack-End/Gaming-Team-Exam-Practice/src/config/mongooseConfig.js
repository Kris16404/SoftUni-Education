const mongoose = require('mongoose');

const { DB_STRING } = require('../utils/constants.js');

exports.dbConnect = async () => {
  try {
    await mongoose.connect(DB_STRING);

    console.log('Succsessfully connected to the DB');
  } catch (error) {
    console.log(`Failed to connect to the DB | ${error}`);
  }
};
