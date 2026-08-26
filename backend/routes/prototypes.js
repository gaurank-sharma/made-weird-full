const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/store');

router.get('/', (req, res) => {
  res.json({ prototypes: readDb().prototypes });
});

module.exports = router;
