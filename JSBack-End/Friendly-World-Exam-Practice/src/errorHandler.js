const { MongooseError } = require('mongoose');

const extractMongooseErrors = (err) => {
  const isInstanceOfMongoose = err instanceof MongooseError;

  if (isInstanceOfMongoose) {
    const errors = Object.values(err.errors);
    const messages = errors.map((e) => e.message);
    return messages;
  }

  return [error.message];
};

module.exports = extractMongooseErrors;
