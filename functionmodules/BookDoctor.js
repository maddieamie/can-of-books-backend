'use strict'

const Book = require('../models/Book'); 

const bookDoctor = {};

bookDoctor.getBooks = function(req, res, next){

  let queryObject = {};

  if (req.query.title) {
      queryObject = { title: req.query.title };
  }

  console.log('REQUEST BODY: ', req.body)

  Book.find(queryObject)
      .then(data => res.status(200).send(data))
      .catch(err => next(err));
};

bookDoctor.postBooks = function(req, res, next){
    const reqBook = req.body;
    Book.create(reqBook)
        .then(createdBook => res.status(201).send(createdBook))
        .catch(err => next(err));
}

bookDoctor.deleteBooks = function(req, res, next){
    const {id} = req.params
    Book.findByIdAndDelete(id)
        .then(deletedBook => res.status(200).send(deletedBook))
        .catch(err => next(err));
}

  bookDoctor.putBooks = function(req, res, next){
    const { title, author, genre, description, status } = req.body;
    const { id } = req.params;

    Book.findByIdAndUpdate(id, { title, author, genre, description, status }, { new: true, overwrite: true })
        .then(updatedBook => res.status(200).send(updatedBook))
        .catch(err => next(err));
}


module.exports = bookDoctor;
