const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  genre: { type: String, required: true },
  pageCount: { type: Number, required: true },
  price: { type: Number, required: true },
  ratings: [Number],
  reviews: [{
    username: { type: String, required: true },
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
