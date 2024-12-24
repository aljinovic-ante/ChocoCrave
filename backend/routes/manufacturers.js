const express = require('express');
const Manufacturer = require('../models/manufacturer.js');
const authenticateUser = require('../middleware/requireAuth');
const authenticateAdmin = require('../middleware/requireAdmin');

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

router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { name, location, image, description, website } = req.body;
    const manufacturer = await Manufacturer.findById(req.params.id);

    if (!manufacturer) {
      return res.status(404).json({ error: 'Manufacturer not found' });
    }

    manufacturer.name = name || manufacturer.name;
    manufacturer.location = location || manufacturer.location;
    manufacturer.image = image || manufacturer.image;
    manufacturer.description = description || manufacturer.description;
    manufacturer.website = website || manufacturer.website;

    await manufacturer.save();
    res.json({ message: 'Manufacturer updated successfully', manufacturer });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update manufacturer' });
  }
});

module.exports = router;
