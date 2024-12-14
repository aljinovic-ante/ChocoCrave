const express = require('express');
const Manufacturer = require('../models/manufacturer.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.json(manufacturers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manufacturers' });
  }
});

module.exports = router;
