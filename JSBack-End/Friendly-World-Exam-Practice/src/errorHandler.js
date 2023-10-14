const { MongooseError } = require('mongoose');

const extractMongooseErrors = (err) => {
  const isInstanceOfMongoose = err instanceof MongooseError;
  if (isInstanceOfMongoose) {
    return [err.message];
  }

  return ['Not an mongoose error'];
};

module.exports = extractMongooseErrors;
