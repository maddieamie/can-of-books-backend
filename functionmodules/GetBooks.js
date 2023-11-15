const Book = require('../models/Book'); 

async function GetBooks(request, response, next) {
  try {
    const filterQuery = {};

    if (request.query.title) {
      filterQuery.title = request.query.title;
    }

    const books = await Book.find(filterQuery);

    response.send(books);
  } catch (error) {
    console.error('Error:', error);
    next(error); // Pass the error to the next middleware
    response.status(500).json({
      error: {
        code: 500,
        message: 'Something went wrong. Please try again later.',
      },
    });
  }
}

module.exports = GetBooks;
