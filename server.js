
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Book = require('./models/Book');

const app = express();
app.use(cors());

mongoose.connect(process.env.DATABASE_URL);

const PORT = process.env.PORT || 3051;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error to MDB'));
db.once('open', () => console.log('Mongoose is connected'));

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books', getBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));