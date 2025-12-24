const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  user: String,
  rating: { type: Number, min: 1, max: 5 },
  comment: String
});

const bookSchema = mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  price: Number,
  description: String,
  image: String,
  reviews: [reviewSchema],
  wishlistUsers: [String] // user IDs
});

module.exports = mongoose.model('Book', bookSchema);