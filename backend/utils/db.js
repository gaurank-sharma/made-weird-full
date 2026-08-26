const mongoose = require('mongoose');

// Serverless functions can be invoked many times against the same warm
// container, so the connection (and its in-flight promise) is cached on
// `global` to avoid reopening it — and hitting Mongo's connection limits —
// on every request.
let cached = global._mongooseConn;
if (!cached) cached = global._mongooseConn = { conn: null, promise: null };

const connectDb = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.DB;
    if (!uri) throw new Error('Missing DB connection string in environment (DB=...)');
    cached.promise = mongoose.connect(uri).then((m) => m);
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = { connectDb };
