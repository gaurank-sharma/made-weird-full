const express = require('express');
const router = express.Router();
const { readDb } = require('../utils/store');

router.get('/', (req, res) => {
  res.json({ process: readDb().process });
});

module.exports = router;
