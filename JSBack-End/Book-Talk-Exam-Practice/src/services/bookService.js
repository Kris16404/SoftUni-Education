const Book = require('../models/Book.js');

exports.getAllBooks = async () => {
  const books = await Book.find().lean().exec();
  return books;
};

exports.createBook = async (
  title,
  author,
  genre,
  stars,
  image,
  review,
  ownerId
) => {
  if (title.length < 2) {
    throw new Error('Invalid title');
  }
  if (author.length < 5) {
    throw new Error('Invalid author');
  }
  if (genre.length < 3) {
    throw new Error('Invalid genre');
  }
  if (stars < 1 || stars > 5) {
    throw new Error('Invalid stars');
  }
  if (!image.startsWith('http://') && !image.startsWith('https://')) {
    throw new Error('Invalid image URL');
  }
  if (review.length < 10) {
    throw new Error('Invalid review');
  }

  const bookTemplate = {
    title: title,
    author: author,
    image: image,
    bookReview: review,
    genre: genre,
    stars: stars,
    owner: ownerId,
  };

  const book = new Book(bookTemplate);

  await book.save();
};

exports.findBookById = async (bookId) => {
  const foundBook = await Book.findById(bookId).lean().exec();

  return foundBook;
};

exports.editBook = async (
  bookId,
  title,
  author,
  genre,
  stars,
  image,
  review
) => {
  if (title.length < 2) {
    throw new Error('Invalid title');
  }
  if (author.length < 5) {
    throw new Error('Invalid author');
  }
  if (genre.length < 3) {
    throw new Error('Invalid genre');
  }
  if (stars < 1 || stars > 5) {
    throw new Error('Invalid stars');
  }
  if (!image.startsWith('http://') && !image.startsWith('https://')) {
    throw new Error('Invalid image URL');
  }
  if (review.length < 10) {
    throw new Error('Invalid review');
  }

  const bookTemplate = {
    title: title,
    author: author,
    image: image,
    bookReview: review,
    genre: genre,
    stars: stars,
  };

  await Book.findByIdAndUpdate(bookId, bookTemplate);
};

exports.deleteBook = async (bookId) => {
  await Book.findByIdAndDelete(bookId);
};

exports.wishToRead = async (bookId, user) => {
  const userId = user._id;
  if (!userId) {
    throw new Error('User not logged in');
  }

  await Book.findByIdAndUpdate(bookId, { $push: { wishingList: userId } });
};

exports.findWhishlistedBooks = async (user) => {
  const userId = user._id;
  const allBooks = await this.getAllBooks();
  const filteredBooks = allBooks.filter((book) =>
    book.wishingList.toString().includes(userId)
  );
  console.log(filteredBooks);
  return filteredBooks;
};
