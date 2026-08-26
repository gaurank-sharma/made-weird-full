// Local dev entrypoint — `vercel dev`/production use api/index.js instead,
// since Vercel runs this app as a serverless function rather than a
// long-lived server.
const app = require('./app');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Made Weird API running on port ${PORT}`));
