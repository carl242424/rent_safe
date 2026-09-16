const mongoose = require('mongoose');

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    plateNumber: { type: String, required: true, unique: true, trim: true, uppercase: true },
    color: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    image: { type: String, default: '' },
    hourlyRate: { type: Number, default: 0 },
    dailyRate: { type: Number, required: true, min: 0 },
    weeklyRate: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Available', 'Rented', 'Maintenance', 'Inactive'],
      default: 'Available',
    },
  },
  { timestamps: true }
);

carSchema.index({ plateNumber: 1, status: 1 });
module.exports = mongoose.model('Car', carSchema);
