// models/Order.js
const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  price: Number
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  items: [ItemSchema],
  total: Number,
  status: {
    type: String,
    enum: ['Pending','Preparing','Out for Delivery','Delivered','Cancelled'],
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);
