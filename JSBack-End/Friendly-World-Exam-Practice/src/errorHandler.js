const { MongooseError } = require('mongoose');

const extractMongooseErrors = (err) => {
  const isInstanceOfMongoose = err instanceof MongooseError;
  if (isInstanceOfMongoose) {
    return [err.message];
  }
  if (err.code === 11000) {
    return ['And user with this email already exists'];
  }
  return [`Not an mongoose error | ${err.message}`];
};

module.exports = extractMongooseErrors;
