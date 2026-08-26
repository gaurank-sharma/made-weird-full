const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { requireAuth } = require('../middleware/auth');

router.use(requireAuth);

const subtotal = (items) => items.reduce((sum, i) => sum + i.price * i.qty, 0);

router.get('/', async (req, res) => {
  const user = await User.findById(req.userId);
  res.json({ items: user.cart, subtotal: subtotal(user.cart) });
});

router.post('/', async (req, res) => {
  const { productId, name, image, price, color, qty } = req.body;
  if (!productId || !name || typeof price !== 'number') {
    return res.status(400).json({ error: 'productId, name and price are required' });
  }

  const user = await User.findById(req.userId);
  const existing = user.cart.find((i) => i.productId === productId && i.color === color);
  if (existing) {
    existing.qty += qty && qty > 0 ? qty : 1;
  } else {
    user.cart.push({ productId, name, image, price, color, qty: qty && qty > 0 ? qty : 1 });
  }
  await user.save();

  res.status(201).json({ items: user.cart, subtotal: subtotal(user.cart) });
});

router.patch('/:productId', async (req, res) => {
  const { qty } = req.body;
  if (typeof qty !== 'number') return res.status(400).json({ error: 'qty is required' });

  const user = await User.findById(req.userId);
  const item = user.cart.find((i) => i.productId === req.params.productId);
  if (!item) return res.status(404).json({ error: 'Item not in cart' });

  if (qty <= 0) {
    user.cart = user.cart.filter((i) => i.productId !== req.params.productId);
  } else {
    item.qty = qty;
  }
  await user.save();

  res.json({ items: user.cart, subtotal: subtotal(user.cart) });
});

router.delete('/:productId', async (req, res) => {
  const user = await User.findById(req.userId);
  user.cart = user.cart.filter((i) => i.productId !== req.params.productId);
  await user.save();

  res.json({ items: user.cart, subtotal: subtotal(user.cart) });
});

router.delete('/', async (req, res) => {
  const user = await User.findById(req.userId);
  user.cart = [];
  await user.save();

  res.json({ items: [], subtotal: 0 });
});

module.exports = router;
