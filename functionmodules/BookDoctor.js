'use strict'

const Book = require('../models/Book'); 

const bookDoctor = {};

bookDoctor.getBooks = function(req, res, next){

  console.log('REQUEST BODY: ', req.body, req.user.email)

  Book.find({ email: req.user.email })
      .then(data => res.status(200).send(data))
      .catch(err => {
        console.error('Error:', err);
        next(err)});
};

bookDoctor.postBooks = function(req, res, next){

    const reqBook = req.body;
    Book.create({ ...reqBook, email: req.user.email })
        .then(createdBook => res.status(201).send(createdBook))
        .catch(err => {
            console.error('Error:', err);
            next(err)});
}

bookDoctor.deleteBooks = function (req, res, next) {
    const { id } = req.params;
  
    Book.findOne({ _id: id, email: req.user.email })
      .then((book) => {
        if (!book) {
          res.status(400).send('Unable to delete book');
        } else {
          return Book.findByIdAndDelete(id);
        }
      })
      .then(() => {
        res.status(204).send('That lil bad book was deleted!');
      })
      .catch((error) => {
        console.error('Error:', error);
        next(error);
      });
  };
  
 
/*
  bookDoctor.putBooks = function (req, res, next) {
    const { id } = req.params;
    const { email } = req.query;
    const { newbook } = req.body;
    
    Book.findOne({ _id: id, email })
  .then((book) => {
    if (!book) {
      res.status(400).send('Unable to update book');
    } else {
      return Book.findByIdAndUpdate(
        { _id: id, ...newbook, email},
        { new: true, overwrite: true }
      );
    }
  })
    .catch((err) => next(err));
  }; */
  /*bookDoctor.putBooks = function (req, res, next) {
    const { id } = req.params;
    const { email } = req.query;
    const { newbook } = req.body;
  
    Book.findOneAndUpdate(
      { _id: id, email },
      { ...newbook, email },
      { new: true, overwrite: true }
    )
      .then(updatedBook => {
        if (!updatedBook) {
          res.status(400).send('Unable to update book');
        } else {
          res.status(200).send(updatedBook);
        }
      })
      .catch(err => next(err));
  }; */

  bookDoctor.putBooks = function (req, res, next) {
    const { id } = req.params;
    //const { email } = req.user.email;
    const newbook = req.body;
    
    console.log(id);
    console.log('the new book is:', newbook);
    // Find the book based on criteria
    Book.findOne({ _id: id})
      .then(existingBook => {
        console.log(existingBook);
        if (!existingBook) {
          res.status(400).send('Unable to update book');
        } else {
         
          return Book.findByIdAndUpdate(
            id,
            { ...newbook},
            { new: true, overwrite: true }
          );
        }
      })
      .then(updatedBook => {
        res.status(200).send(updatedBook);
      })
      .catch(err => {
        next(err);
      });
  };
  

  


module.exports = bookDoctor;
