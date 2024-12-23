const express = require('express');
const Manufacturer = require('../models/manufacturer.js');
const { authenticateUser } = require('../middleware/requireAuth');
const { authenticateAdmin } = require('../middleware/requireAdmin');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.json(manufacturers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manufacturers' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const manufacturer = await Manufacturer.findById(req.params.id);
    if (!manufacturer) {
      return res.status(404).json({ error: 'Manufacturer not found' });
    }
    res.json(manufacturer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manufacturer' });
  }
});

module.exports = router;
