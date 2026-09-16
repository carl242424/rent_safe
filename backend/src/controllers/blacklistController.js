const mongoose = require('mongoose');
const Blacklist = require('../models/Blacklist');

const normalizeValue = (value = '') => value.toLowerCase().trim();

const getBlacklist = async (req, res) => {
  try {
    const records = await Blacklist.find().sort({ createdAt: -1 });
    return res.json(records);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to load blacklist', error: error.message });
  }
};

const checkBlacklist = async (req, res) => {
  try {
    const { name = '', facebook = '', phone = '' } = req.query;
    const matches = await Blacklist.find({ active: true });

    const normalizedName = normalizeValue(name);
    const normalizedFacebook = normalizeValue(facebook);
    const normalizedPhone = normalizeValue(phone);

    const filter = matches.filter((record) => {
      const nameMatch = normalizedName && normalizeValue(record.renterName).includes(normalizedName);
      const facebookMatch = normalizedFacebook && normalizeValue(record.facebook).includes(normalizedFacebook);
      const phoneMatch = normalizedPhone && normalizeValue(record.phone).includes(normalizedPhone);
      return nameMatch || facebookMatch || phoneMatch;
    });

    return res.json(filter);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to check blacklist', error: error.message });
  }
};

const createBlacklist = async (req, res) => {
  try {
    const { renterName, facebook, phone, reason, notes, image, active } = req.body;

    if (!renterName || !reason) {
      return res.status(400).json({ message: 'Renter name and reason are required' });
    }

    const record = await Blacklist.create({ renterName, facebook, phone, reason, notes, image, active: active !== false });
    return res.status(201).json(record);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create blacklist entry', error: error.message });
  }
};

const updateBlacklist = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid blacklist id' });
    }

    const record = await Blacklist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!record) return res.status(404).json({ message: 'Blacklist record not found' });
    return res.json(record);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update blacklist entry', error: error.message });
  }
};

const deleteBlacklist = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid blacklist id' });
    }

    const record = await Blacklist.findById(req.params.id);
    if (!record) return res.status(404).json({ message: 'Blacklist record not found' });

    record.active = false;
    await record.save();
    return res.json({ message: 'Blacklist record deactivated' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to deactivate blacklist entry', error: error.message });
  }
};

module.exports = { getBlacklist, checkBlacklist, createBlacklist, updateBlacklist, deleteBlacklist };
