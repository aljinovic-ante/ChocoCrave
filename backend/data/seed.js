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
    console.log('Connected to MongoDB');

    const manufacturersData = readJSONFile('manufacturers.json');

    console.log('Seeding manufacturers...');
    for (const manufacturer of manufacturersData) {
      await Manufacturer.updateOne(
        { name: manufacturer.name },
        { $set: manufacturer },
        { upsert: true }
      );
    }
    console.log('Manufacturers updated or inserted successfully.');

    await mongoose.disconnect();
    console.log('Database seeding completed and disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding the manufacturers:', error);
    await mongoose.disconnect();
  }
};

seedManufacturers();
