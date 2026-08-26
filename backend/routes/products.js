const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/store');

// GET /api/products?category=home-decor&featured=true
router.get('/', (req, res) => {
  const { category, featured } = req.query;
  let products = readDb().products;

  if (category) products = products.filter((p) => p.category === category);
  if (featured !== undefined) products = products.filter((p) => p.featured === (featured === 'true'));

  res.json({ products });
});

router.get('/:id', (req, res) => {
  const product = readDb().products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ product });
});

module.exports = router;
