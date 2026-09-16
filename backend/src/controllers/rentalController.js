const mongoose = require('mongoose');
const Rental = require('../models/Rental');
const Car = require('../models/Car');
const Renter = require('../models/Renter');
const Blacklist = require('../models/Blacklist');

const calculateDurationInHours = (startDate, endDate) => {
  const diffMs = endDate.getTime() - startDate.getTime();
  return diffMs / (1000 * 60 * 60);
};

const calculateRentalCost = (startDate, endDate, car) => {
  const hours = calculateDurationInHours(startDate, endDate);
  const days = hours / 24;
  const weeks = days / 7;

  if (car.hourlyRate && hours < 24) return { rateType: 'hourly', rateUsed: car.hourlyRate, totalAmount: Number((hours * car.hourlyRate).toFixed(2)) };
  if (car.weeklyRate && weeks >= 1) return { rateType: 'weekly', rateUsed: car.weeklyRate, totalAmount: Number((weeks * car.weeklyRate).toFixed(2)) };

  return { rateType: 'daily', rateUsed: car.dailyRate, totalAmount: Number((days * car.dailyRate).toFixed(2)) };
};

const getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find().sort({ createdAt: -1 }).populate('renterId', 'fullName phone facebook').populate('carId', 'name plateNumber dailyRate status');
    return res.json(rentals);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load rentals', error: error.message });
  }
};

const getRentalById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid rental id' });
    }

    const rental = await Rental.findById(req.params.id).populate('renterId').populate('carId');
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    return res.json(rental);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch rental', error: error.message });
  }
};

const createRental = async (req, res) => {
  try {
    const { renterId, carId, startDate, returnDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(renterId) || !mongoose.Types.ObjectId.isValid(carId)) {
      return res.status(400).json({ message: 'Valid renterId and carId are required' });
    }

    const renter = await Renter.findById(renterId);
    const car = await Car.findById(carId);

    if (!renter) return res.status(404).json({ message: 'Renter not found' });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (['Maintenance', 'Inactive'].includes(car.status)) return res.status(400).json({ message: 'Car is not available for rental' });

    const parsedStart = new Date(startDate);
    const parsedReturn = new Date(returnDate);

    if (Number.isNaN(parsedStart.getTime()) || Number.isNaN(parsedReturn.getTime()) || parsedReturn <= parsedStart) {
      return res.status(400).json({ message: 'Valid rental dates are required' });
    }

    const overlappingRental = await Rental.findOne({
      carId,
      status: { $in: ['Reserved', 'Active'] },
      startDate: { $lt: parsedReturn },
      returnDate: { $gt: parsedStart },
    }).sort({ startDate: 1 });

    if (overlappingRental) {
      return res.status(409).json({
        message: `This car is already booked from ${overlappingRental.startDate.toLocaleString()} to ${overlappingRental.returnDate.toLocaleString()}. Choose a different date range.`,
        conflict: { startDate: overlappingRental.startDate, returnDate: overlappingRental.returnDate },
      });
    }

    const blacklistMatches = await Blacklist.find({ active: true });
    const hasMatch = blacklistMatches.some((entry) => {
      const nameMatch = renter.fullName.toLowerCase().includes((entry.renterName || '').toLowerCase());
      const facebookMatch = (renter.facebook || '').toLowerCase().includes((entry.facebook || '').toLowerCase());
      const phoneMatch = (renter.phone || '').toLowerCase().includes((entry.phone || '').toLowerCase());
      return nameMatch || facebookMatch || phoneMatch;
    });

    const pricing = calculateRentalCost(parsedStart, parsedReturn, car);
    const durationHours = calculateDurationInHours(parsedStart, parsedReturn);
    const duration = Math.max(1, Math.ceil(durationHours / 24));

    const rental = await Rental.create({
      renterId,
      carId,
      startDate: parsedStart,
      returnDate: parsedReturn,
      duration,
      rateType: pricing.rateType,
      rateUsed: pricing.rateUsed,
      totalAmount: pricing.totalAmount,
      status: 'Reserved',
    });

    car.status = 'Rented';
    await car.save();

    return res.status(201).json({ rental, blacklistWarning: hasMatch });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create rental', error: error.message });
  }
};

const updateRental = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid rental id' });
    }

    const rental = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    return res.json(rental);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update rental', error: error.message });
  }
};

const completeRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id).populate('carId');
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    if (rental.status === 'Completed') return res.status(400).json({ message: 'Rental already completed' });

    rental.status = 'Completed';
    rental.actualReturnDate = new Date();
    await rental.save();

    if (rental.carId) {
      rental.carId.status = 'Available';
      await rental.carId.save();
    }

    return res.json({ message: 'Rental completed successfully', rental });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to complete rental', error: error.message });
  }
};

const cancelRental = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id).populate('carId');
    if (!rental) return res.status(404).json({ message: 'Rental not found' });
    if (rental.status === 'Completed') return res.status(400).json({ message: 'Completed rentals cannot be cancelled' });

    rental.status = 'Cancelled';
    await rental.save();

    if (rental.carId && rental.carId.status === 'Rented') {
      rental.carId.status = 'Available';
      await rental.carId.save();
    }

    return res.json({ message: 'Rental cancelled successfully', rental });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to cancel rental', error: error.message });
  }
};

module.exports = { getRentals, getRentalById, createRental, updateRental, completeRental, cancelRental };
