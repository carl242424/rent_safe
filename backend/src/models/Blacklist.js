const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema(
  {
    renterName: { type: String, required: true, trim: true },
    facebook: { type: String, default: '', trim: true },
    phone: { type: String, default: '', trim: true },
    reason: { type: String, required: true, trim: true },
    notes: { type: String, default: '', trim: true },
    active: { type: Boolean, default: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

blacklistSchema.index({ renterName: 'text', facebook: 'text', phone: 'text', active: 1 });
module.exports = mongoose.model('Blacklist', blacklistSchema);
