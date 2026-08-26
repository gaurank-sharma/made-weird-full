const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/store');
const WaitlistSignup = require('../models/WaitlistSignup');
const { isValidEmail } = require('../utils/validate');

// POST /api/waitlist — join the waitlist for an in-production prototype
router.post('/', async (req, res) => {
  const { email, prototypeId } = req.body;
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  const prototype = readDb().prototypes.find((p) => p.id === Number(prototypeId));
  if (!prototype) {
    return res.status(404).json({ error: 'That prototype could not be found' });
  }

  const normalized = email.trim().toLowerCase();
  const existing = await WaitlistSignup.findOne({ email: normalized, prototypeId: prototype.id });
  if (existing) {
    return res.json({ message: `Already on the list for ${prototype.name}.` });
  }

  await WaitlistSignup.create({ email: normalized, prototypeId: prototype.id });

  res.status(201).json({ message: `You're on the waitlist for ${prototype.name} — we'll email you the second it drops.` });
});

module.exports = router;
