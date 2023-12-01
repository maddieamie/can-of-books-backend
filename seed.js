const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);
console.log('connected to server in seed.js');
const Book = require('./models/Book');

async function seed() {
  // seed the database with some cats, so I can retrieve them
  const myBook = new Book({
    title: 'To Shape a Dragons Breath',
    author: 'Moniquill Blackgoose',
    genre: 'Fantasy',
    description:
    "The remote island of Masquapaug has not seen a dragon in many generations—until fifteen-year-old Anequs finds a dragon’s egg and bonds with its hatchling. Her people are delighted, for all remember the tales of the days when dragons lived among them and danced away the storms of autumn, enabling the people to thrive. To them, Anequs is revered as Nampeshiweisit—a person in a unique relationship with a dragon.",
    status: true,
    email: 'maddieamie@gmail.com'
  })

  console.log(myBook);

  await myBook.save()
    .then(() => console.log('Saved Dragon to DB'))
    .catch(err => console.error(err));

  await Book.create({
    title: 'Where it Rains in Color',
    author: 'Denise Crittendon',
    genre: 'Sci-Fi',
    description:
    "A vibrant mix of Afrofuturism, dystopian and science fiction narrative, Where it Rains in Color is a novel that unravels the intricacy of beauty and the myths of the Dogon tribe. The world building is set in Swazembi. The planet is a well known tourist destination to see the rare Indigo.",
    status: true,
    email: 'maddieamie@gmail.com'
  })
  
  await Book.create({
    title: 'Unnatural Magic',
    author: 'C. M. Waggoner',
    genre: 'Fantasy',
    description:
    "Onna can write the parameters of a spell faster than any of the young men in her village. So when the arcane academy decides it's untoward to teach a woman magic she sets sail for the city-state of Hexos in search of more enlightened attitudes.",
    status: false,
    email: 'maddieamie@gmail.com'
  })
  

  mongoose.disconnect();
}

seed();