// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const auth = require('../middleware/authMiddleware');

// 🟢 Create order (public)
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, address, items, total } = req.body;
    if (!customerName || !phone || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Please provide all required fields.' });
    }
    const order = new Order({ customerName, phone, address, items, total });
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Server error while saving order' });
  }
});

// 🟢 Get all orders (admin only)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Server error while fetching orders' });
  }
});

// 🟢 Update order status
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ error: 'Order not found' });
    res.json(updated);
  } catch (err) {
    console.error('Error updating order:', err);
    res.status(400).json({ error: 'Invalid order ID or data' });
  }
});

// 🟢 Delete order
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    console.error('Error deleting order:', err);
    res.status(400).json({ error: 'Invalid order ID' });
  }
});

// 🟢 Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(400).json({ error: 'Invalid order ID' });
  }
});

module.exports = router;
