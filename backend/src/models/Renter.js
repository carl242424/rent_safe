const mongoose = require('mongoose');

const renterSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    facebook: { type: String, default: '', trim: true },
    validId: { type: String, default: '', trim: true },
    image: { type: String, default: '' },
  },
  { timestamps: true }
);

renterSchema.index({ fullName: 'text', facebook: 'text', phone: 'text' });
module.exports = mongoose.model('Renter', renterSchema);
