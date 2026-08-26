const mongoose = require('mongoose');

const waitlistSignupSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    prototypeId: { type: Number, required: true }
  },
  { timestamps: true }
);

waitlistSignupSchema.index({ email: 1, prototypeId: 1 }, { unique: true });

module.exports = mongoose.model('WaitlistSignup', waitlistSignupSchema);
