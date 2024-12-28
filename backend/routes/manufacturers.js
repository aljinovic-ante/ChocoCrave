const express = require('express');
const mongoose = require('mongoose');
const Manufacturer = require('../models/manufacturer.js');
const authenticateUser = require('../middleware/requireAuth');
const authenticateAdmin = require('../middleware/requireAdmin');
const Chocolate = require('../models/chocolate');
const router = express.Router();

router.get('/', authenticateUser, async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find();
    res.json(manufacturers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch manufacturers' });
  }
});

router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid manufacturer ID' });
    }

    const manufacturer = await Manufacturer.findById(id);
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
    const { id } = req.params;
    const { name, location, image, description, website } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid manufacturer ID' });
    }

    const manufacturer = await Manufacturer.findById(id);
    if (!manufacturer) {
      return res.status(404).json({ error: 'Manufacturer not found' });
    }

    manufacturer.name = name || manufacturer.name;
    manufacturer.location = location || manufacturer.location;
    manufacturer.image = image || manufacturer.image;
    manufacturer.description = description || manufacturer.description;
    manufacturer.website = website || manufacturer.website;

    const updatedManufacturer = await manufacturer.save();
    return res.status(200).json({ message: 'Manufacturer updated successfully', manufacturer: updatedManufacturer });
  } catch (error) {
    console.error('Error updating manufacturer:', error);
    return res.status(500).json({ error: 'Failed to update manufacturer' });
  }
});

router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { name, location, image, description, website } = req.body;

    if (!name || !location || !description) {
      return res.status(400).json({ error: 'Name, location, and description are required' });
    }

    const newManufacturer = new Manufacturer({
      name,
      location,
      image,
      description,
      website,
    });

    const savedManufacturer = await newManufacturer.save();
    res.status(201).json({ message: 'Manufacturer created successfully', manufacturer: savedManufacturer });
  } catch (error) {
    console.error('Error creating manufacturer:', error);
    res.status(500).json({ error: 'Failed to create manufacturer' });
  }
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid manufacturer ID' });
    }

    const manufacturer = await Manufacturer.findById(id);
    if (!manufacturer) {
      return res.status(404).json({ error: 'Manufacturer not found' });
    }

    const relatedChocolates = await Chocolate.find({ manufacturer_id: id });
    console.log("RELATED: ",relatedChocolates);
    if (relatedChocolates.length > 0) {
      return res.status(400).json({
        error: 'Cannot delete manufacturer. There are products related to this manufacturer.',
      });
    }
    
    console.log("proslo :(");

    await Manufacturer.findByIdAndDelete(id);
    res.status(200).json({ message: 'Manufacturer deleted successfully' });
  } catch (error) {
    console.error('Error deleting manufacturer:', error);
    res.status(500).json({ error: 'Failed to delete manufacturer' });
  }
});

module.exports = router;