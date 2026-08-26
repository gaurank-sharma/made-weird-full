// Vercel serverless entrypoint. An Express app is itself a valid
// `(req, res)` request handler, so exporting it directly is enough —
// no `app.listen()` here. See vercel.json for the rewrite that sends
// every /api/* request to this function.
module.exports = require('../app');
