const Car = require('../models/Car');
const Renter = require('../models/Renter');
const Rental = require('../models/Rental');
const Blacklist = require('../models/Blacklist');

const getDashboardStats = async (req, res) => {
  try {
    const [totalCars, availableCars, activeRentals, blacklistedRenters, totalRevenue, currentlyRented] = await Promise.all([
      Car.countDocuments(),
      Car.countDocuments({ status: 'Available' }),
      Rental.countDocuments({ status: 'Active' }),
      Blacklist.countDocuments({ active: true }),
      Rental.aggregate([
        { $match: { status: { $in: ['Active', 'Completed'] } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      Car.countDocuments({ status: 'Rented' }),
    ]);

    const stats = {
      totalCars,
      availableCars,
      currentlyRented,
      activeRentals,
      blacklistedRenters,
      totalRevenue: totalRevenue[0]?.total || 0,
    };

    return res.json(stats);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to generate dashboard stats', error: error.message });
  }
};

const getRecentRentals = async (req, res) => {
  try {
    const rentals = await Rental.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('renterId', 'fullName')
      .populate('carId', 'name');

    const mapped = rentals.map((rental) => ({
      id: rental._id,
      renter: rental.renterId?.fullName || 'Unknown',
      vehicle: rental.carId?.name || 'Unknown',
      duration: rental.duration,
      totalAmount: rental.totalAmount,
      paymentMethod: 'Cash',
      status: rental.status,
      createdAt: rental.createdAt,
    }));

    return res.json(mapped);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to load recent rentals', error: error.message });
  }
};

module.exports = { getDashboardStats, getRecentRentals };
