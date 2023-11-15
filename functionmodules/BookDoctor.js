'use strict'

const Book = require('../models/Book'); 

const bookDoctor = {};

bookDoctor.getBooks = function(req, res, next){
    let queryObject = {};

    if(req.query.title){
        queryObject = {title: req.query.title}
    }

    Book.find(queryObject)
        .then(data => res.status(200).send(data))
        .catch(err => next(err));
}

bookDoctor.postBooks = function(req, res, next){
    const data = req.body;
    Book.create(data)
        .then(createdBook => res.status(201).send(createdBook))
        .catch(err => next(err));
}

bookDoctor.deleteBooks = function(req, res, next){
    const {id} = req.params
    Book.findByIdAndDelete(id)
        .then(deletedBook => res.status(200).send(deletedBook))
        .catch(err => next(err));
}

module.exports = bookDoctor;
