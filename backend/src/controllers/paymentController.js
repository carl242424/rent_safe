const mongoose = require('mongoose');
const Payment = require('../models/Payment');
const Rental = require('../models/Rental');

const getPaymentsByRental = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.rentalId)) {
      return res.status(400).json({ message: 'Invalid rental id' });
    }

    const payments = await Payment.find({ rentalId: req.params.rentalId }).sort({ createdAt: -1 });
    return res.json(payments);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load payments', error: error.message });
  }
};

const createPayment = async (req, res) => {
  try {
    const { rentalId, method, amount, referenceNumber, paymentDate, proofImage, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(rentalId)) {
      return res.status(400).json({ message: 'Valid rental id is required' });
    }

    const rental = await Rental.findById(rentalId);
    if (!rental) return res.status(404).json({ message: 'Rental not found' });

    const payment = await Payment.create({
      rentalId,
      method,
      amount,
      referenceNumber: referenceNumber || '',
      paymentDate: paymentDate ? new Date(paymentDate) : new Date(),
      proofImage: proofImage || '',
      status: status || 'Pending',
    });

    return res.status(201).json(payment);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create payment record', error: error.message });
  }
};

module.exports = { getPaymentsByRental, createPayment };
