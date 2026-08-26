const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.json');

const readDb = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));

module.exports = { readDb };
