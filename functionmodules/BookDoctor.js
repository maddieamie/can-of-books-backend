'use strict'

const Book = require('../models/Book'); 

const bookDoctor = {};

bookDoctor.getBooks = function(req, res, next){

  let queryObject = {};

  if(req.query.email) {
    queryObject.email = req.query.email;
  }

  if (req.query.title) {
      queryObject = { title: req.query.title };
  }

  console.log('REQUEST BODY: ', req.body)

  Book.find(queryObject)
      .then(data => res.status(200).send(data))
      .catch(err => next(err));
};

bookDoctor.postBooks = function(req, res, next){
    const { email } = req.query;
    const reqBook = req.body;
    Book.create(...reqBook, email)
        .then(createdBook => res.status(201).send(createdBook))
        .catch(err => next(err));
}

bookDoctor.deleteBooks = function(req, res, next){
    const {id} = req.params;
    const { email } = req.query;
    Book.findByIdAndDelete(id, email)
        .then(deletedBook => res.status(200).send('That lil bad book was deleted!', deletedBook))
        .catch(err => next(err));
}

bookDoctor.putBooks = function (req, res, next) {
    const { title, author, genre, description, status } = req.body;
    const { id } = req.params;
    const { email } = req.query;
  
    // Update only the fields that are present in the request body
    const updateFields = {};
    if (title) updateFields.title = title;
    if (author) updateFields.author = author;
    if (genre) updateFields.genre = genre;
    if (description) updateFields.description = description;
    if (status) updateFields.status = status;
  
    Book.findByIdAndUpdate(id, ...updateFields, email, { new: true, overwrite: true })
      .then((updatedBook) => res.status(200).send(updatedBook))
      .catch((err) => next(err)); 
}


module.exports = bookDoctor;
