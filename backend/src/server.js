require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { connectDB, closeDB } = require('./config/database');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');
const renterRoutes = require('./routes/renterRoutes');
const blacklistRoutes = require('./routes/blacklistRoutes');
const rentalRoutes = require('./routes/rentalRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const seedDefaultAdmin = async () => {
  const username = 'admin';
  const email = 'admin@rentsafe.com';
  const password = 'admin123';

  const existing = await User.findOne({ role: 'admin' });
  if (!existing) {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ username, email, passwordHash, role: 'admin' });
    console.log('Default admin created: admin@rentsafe.com / admin123');
  }
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'RentSafe API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/renters', renterRoutes);
app.use('/api/blacklist', blacklistRoutes);
app.use('/api/rentals', rentalRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    await seedDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`RentSafe backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', async () => {
  await closeDB();
  process.exit(0);
});

module.exports = app;
