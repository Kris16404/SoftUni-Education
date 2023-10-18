const Book = require('../models/Book.js');

exports.getAllBooks = async () => {
  const books = Book.find().lean().exec();
  return books;
};
