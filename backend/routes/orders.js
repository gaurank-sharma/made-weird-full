const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Order = require('../models/Order');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

const SHIPPING_FLAT = 49;
const FREE_SHIPPING_THRESHOLD = 1499;

router.post('/', async (req, res) => {
  const { address } = req.body;
  const required = ['name', 'phone', 'line1', 'city', 'state', 'pincode'];
  if (!address || required.some((f) => !address[f] || !String(address[f]).trim())) {
    return res.status(400).json({ error: 'A complete delivery address is required' });
  }

  const user = await User.findById(req.userId);
  if (!user.cart.length) return res.status(400).json({ error: 'Your cart is empty' });

  const subtotal = user.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;

  const order = await Order.create({
    user: user._id,
    items: user.cart,
    subtotal,
    shipping,
    total: subtotal + shipping,
    paymentMethod: 'cod',
    address
  });

  user.cart = [];
  await user.save();

  res.status(201).json({ order });
});

router.get('/', async (req, res) => {
  const orders = await Order.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json({ orders });
});

router.get('/:id', async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.userId });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json({ order });
});

module.exports = router;
