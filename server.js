
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const BookDoctor = require('./functionmodules/BookDoctor');
const verifyUser= require('./functionmodules/authorize.js');


const app = express();
app.use(cors());

// REQUIRED to allow req.body to show our content
app.use(express.json())

const PORT = process.env.PORT || 3051;
const username=process.env.username;
const password=process.env.password;
const clusterName=process.env.clusterName; 
mongoose.connect(`mongodb+srv://${username}:${password}@${clusterName}.wwybe7x.mongodb.net/?retryWrites=true&w=majority`);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error to MDB'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (req, res, next) => res.status(200).send('Default Route working'));

app.use(verifyUser);

app.get('/books', BookDoctor.getBooks);
app.post('/books', BookDoctor.postBooks);
app.delete('/books/:id', BookDoctor.deleteBooks);
app.put('/books/:id', BookDoctor.putBooks);
app.get('/user', handleGetUser);

function handleGetUser(req, res) {
    console.log('Getting the user');
    res.send(req.user);
  }

app.get('*', (req, res, next) => res.status(404).send('Resource not Found'));

app.listen(PORT, () => console.log(`listening on ${PORT}`));