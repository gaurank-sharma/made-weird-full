require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { connectDb } = require('./utils/db');
const productsRoutes = require('./routes/products');
const categoriesRoutes = require('./routes/categories');
const testimonialsRoutes = require('./routes/testimonials');
const processRoutes = require('./routes/process');
const prototypesRoutes = require('./routes/prototypes');
const newsletterRoutes = require('./routes/newsletter');
const waitlistRoutes = require('./routes/waitlist');
const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

// Every route needs Mongo (directly, or via the JSON store's sibling
// collections), so connect once per cold start and reuse the cached
// connection on every warm invocation — see utils/db.js.
app.use(async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch (err) {
    next(err);
  }
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', message: 'Made Weird API is running' }));

app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/process', processRoutes);
app.use('/api/prototypes', prototypesRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);

app.use((req, res) => res.status(404).json({ error: 'Not found' }));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;
