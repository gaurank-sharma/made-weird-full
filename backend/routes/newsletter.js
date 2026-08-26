const express = require('express');
const router = express.Router();
const NewsletterSignup = require('../models/NewsletterSignup');
const { isValidEmail } = require('../utils/validate');

// POST /api/newsletter — subscribe for drop alerts + first-order discount
router.post('/', async (req, res) => {
  const { email } = req.body;
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  const normalized = email.trim().toLowerCase();
  const existing = await NewsletterSignup.findOne({ email: normalized });
  if (existing) {
    return res.json({ message: "You're already on the list — new drops land in your inbox every Friday." });
  }

  await NewsletterSignup.create({ email: normalized });

  res.status(201).json({ message: "You're in! Watch your inbox for ₹200 off and every new drop." });
});

module.exports = router;
