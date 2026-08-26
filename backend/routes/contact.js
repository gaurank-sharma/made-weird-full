const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const { isValidEmail } = require('../utils/validate');

// POST /api/contact — general contact form (support, order questions, etc.)
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name?.trim() || !isValidEmail(email) || !message?.trim()) {
    return res.status(400).json({ error: 'Name, a valid email, and a message are all required' });
  }

  await ContactMessage.create({ name: name.trim(), email: email.trim().toLowerCase(), message: message.trim() });

  res.status(201).json({ message: "Got it — we'll get back to you within a day." });
});

module.exports = router;
