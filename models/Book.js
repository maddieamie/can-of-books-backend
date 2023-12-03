'use strict';

const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  status: Boolean,
  email: String
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;