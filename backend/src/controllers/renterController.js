const mongoose = require('mongoose');
const Renter = require('../models/Renter');
const Rental = require('../models/Rental');

const getRenters = async (req, res) => {
  try {
    const renters = await Renter.find().sort({ createdAt: -1 });
    return res.json(renters);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load renters', error: error.message });
  }
};

const getRenterById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid renter id' });
    }

    const renter = await Renter.findById(req.params.id);
    if (!renter) return res.status(404).json({ message: 'Renter not found' });
    return res.json(renter);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch renter', error: error.message });
  }
};

const createRenter = async (req, res) => {
  try {
    const { fullName, phone, address, facebook, validId, image } = req.body;

    if (!fullName || !phone || !address) {
      return res.status(400).json({ message: 'Full name, phone, and address are required' });
    }

    const renter = await Renter.create({ fullName, phone, address, facebook, validId, image });
    return res.status(201).json(renter);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create renter', error: error.message });
  }
};

const updateRenter = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid renter id' });
    }

    const renter = await Renter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!renter) return res.status(404).json({ message: 'Renter not found' });
    return res.json(renter);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update renter', error: error.message });
  }
};

const getRenterHistory = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid renter id' });
    }

    const rentals = await Rental.find({ renterId: req.params.id }).populate('carId', 'name').sort({ createdAt: -1 });
    return res.json(rentals);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load renter history', error: error.message });
  }
};

module.exports = { getRenters, getRenterById, createRenter, updateRenter, getRenterHistory };
