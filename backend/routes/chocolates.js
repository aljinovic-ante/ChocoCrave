const express = require('express');
const mongoose = require('mongoose');
const Chocolate = require('../models/chocolate.js');
const authenticateUser = require('../middleware/requireAuth');
const authenticateAdmin = require('../middleware/requireAdmin');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const chocolates = await Chocolate.find().populate('manufacturer_id', 'name location');
    res.json(chocolates);
  } catch (error) {
    console.error('Error fetching chocolates:', error);
    res.status(500).json({ error: 'Failed to fetch chocolates' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid chocolate ID' });
    }

    const chocolate = await Chocolate.findById(id).populate('manufacturer_id', 'name location');
    if (!chocolate) {
      return res.status(404).json({ error: 'Chocolate not found' });
    }

    res.json(chocolate);
  } catch (error) {
    console.error('Error fetching chocolate:', error);
    res.status(500).json({ error: 'Failed to fetch chocolate' });
  }
});

router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const {
      name,
      price,
      cocoa_percentage,
      color,
      type,
      weight,
      manufacturer_id,
      description,
      image,
      nutritional_info,
    } = req.body;

    if (!name || !price || !cocoa_percentage || !manufacturer_id) {
      return res.status(400).json({ error: 'Name, price, cocoa_percentage, and manufacturer_id are required' });
    }

    const newChocolate = new Chocolate({
      name,
      price,
      cocoa_percentage,
      color,
      type,
      weight,
      manufacturer_id,
      description,
      image,
      nutritional_info,
    });

    const savedChocolate = await newChocolate.save();
    res.status(201).json({ message: 'Chocolate created successfully', chocolate: savedChocolate });
  } catch (error) {
    console.error('Error creating chocolate:', error);
    res.status(500).json({ error: 'Failed to create chocolate' });
  }
});

router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      cocoa_percentage,
      color,
      type,
      weight,
      manufacturer_id,
      description,
      image,
      nutritional_info,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid chocolate ID' });
    }

    const chocolate = await Chocolate.findById(id);
    if (!chocolate) {
      return res.status(404).json({ error: 'Chocolate not found' });
    }

    chocolate.name = name || chocolate.name;
    chocolate.price = price || chocolate.price;
    chocolate.cocoa_percentage = cocoa_percentage || chocolate.cocoa_percentage;
    chocolate.color = color || chocolate.color;
    chocolate.type = type || chocolate.type;
    chocolate.weight = weight || chocolate.weight;
    chocolate.manufacturer_id = manufacturer_id || chocolate.manufacturer_id;
    chocolate.description = description || chocolate.description;
    chocolate.image = image || chocolate.image;
    chocolate.nutritional_info = { ...chocolate.nutritional_info, ...nutritional_info };

    const updatedChocolate = await chocolate.save();
    res.status(200).json({ message: 'Chocolate updated successfully', chocolate: updatedChocolate });
  } catch (error) {
    console.error('Error updating chocolate:', error);
    res.status(500).json({ error: 'Failed to update chocolate' });
  }
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid chocolate ID' });
    }

    const chocolate = await Chocolate.findById(id);
    if (!chocolate) {
      return res.status(404).json({ error: 'Chocolate not found' });
    }

    await Chocolate.findByIdAndDelete(id);
    res.status(200).json({ message: 'Chocolate deleted successfully' });
  } catch (error) {
    console.error('Error deleting chocolate:', error);
    res.status(500).json({ error: 'Failed to delete chocolate' });
  }
});

module.exports = router;