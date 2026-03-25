const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  originalPrice: Number,
  category: String,
  imageUrl: String,
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
