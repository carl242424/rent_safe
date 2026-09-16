const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    renterId: { type: mongoose.Schema.Types.ObjectId, ref: 'Renter', required: true },
    carId: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    startDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    actualReturnDate: { type: Date, default: null },
    duration: { type: Number, required: true },
    rateType: { type: String, enum: ['hourly', 'daily', 'weekly'], required: true },
    rateUsed: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Reserved', 'Active', 'Completed', 'Cancelled'],
      default: 'Reserved',
    },
  },
  { timestamps: true }
);

rentalSchema.index({ status: 1, startDate: 1, returnDate: 1 });
module.exports = mongoose.model('Rental', rentalSchema);
