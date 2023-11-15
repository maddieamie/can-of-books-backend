
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const BookDoctor = require('./functionmodules/BookDoctor');


const app = express();
app.use(cors());

// REQUIRED to allow req.body to show our content
app.use(express.json())

const PORT = process.env.PORT || 3051;
mongoose.connect(process.env.DATABASE_URL);


const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error to MDB'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/', (req, res, next) => res.status(200).send('Default Route working'));

app.get('/books', BookDoctor.getBooks);
app.post('/books', BookDoctor.postBooks);
app.delete('/books/:id', BookDoctor.deleteBooks);

app.get('*', (req, res, next) => res.status(404).send('Resource not Found'));

app.listen(PORT, () => console.log(`listening on ${PORT}`));