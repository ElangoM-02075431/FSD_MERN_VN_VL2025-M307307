const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  isAdmin: { type: Boolean, default: false },
  cart: [{ bookId: mongoose.Schema.Types.ObjectId, quantity: Number }],
  wishlist: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('User', userSchema);