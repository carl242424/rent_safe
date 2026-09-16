const Car = require('../models/Car');
const Rental = require('../models/Rental');
const mongoose = require('mongoose');

const getCars = async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    return res.json(cars);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load cars', error: error.message });
  }
};

const getCarById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid car id' });
    }

    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    return res.json(car);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch car', error: error.message });
  }
};

const createCar = async (req, res) => {
  try {
    const { name, plateNumber, color, year, image, hourlyRate, dailyRate, weeklyRate, status } = req.body;

    if (!name || !plateNumber || !color || !year || !dailyRate) {
      return res.status(400).json({ message: 'Car name, plate number, color, year, and daily rate are required' });
    }

    const car = await Car.create({
      name,
      plateNumber,
      color,
      year,
      image: image || '',
      hourlyRate: Number(hourlyRate || 0),
      dailyRate: Number(dailyRate),
      weeklyRate: Number(weeklyRate || 0),
      status: status || 'Available',
    });

    return res.status(201).json(car);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create car', error: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid car id' });
    }

    const car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!car) return res.status(404).json({ message: 'Car not found' });
    return res.json(car);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update car', error: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid car id' });
    }

    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ message: 'Car not found' });

    const rentalExists = await Rental.exists({ carId: req.params.id, status: { $in: ['Active', 'Reserved'] } });
    if (rentalExists) {
      return res.status(400).json({ message: 'Cannot delete a car with active or reserved rentals' });
    }

    await Car.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete car', error: error.message });
  }
};

module.exports = { getCars, getCarById, createCar, updateCar, deleteCar };
