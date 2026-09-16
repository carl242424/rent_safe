const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
    method: { type: String, enum: ['Cash', 'GCash'], required: true },
    amount: { type: Number, required: true, min: 0 },
    referenceNumber: { type: String, default: '' },
    paymentDate: { type: Date, default: Date.now },
    proofImage: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Partial', 'Refunded'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);
