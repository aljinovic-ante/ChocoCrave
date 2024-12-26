const mongoose = require('mongoose');
const Manufacturer = require('../models/manufacturer.js');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://127.0.0.1:27017/chococrave';

const readJSONFile = (fileName) => {
    const filePath = path.join(__dirname, fileName);
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const seedManufacturers = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const manufacturersData = readJSONFile('manufacturers.json');

    for (const manufacturer of manufacturersData) {
      await Manufacturer.updateOne(
        { name: manufacturer.name },
        { $set: manufacturer },
        { upsert: true }
      );
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding the manufacturers:', error);
    await mongoose.disconnect();
  }
};

seedManufacturers();
