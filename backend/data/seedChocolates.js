const mongoose = require('mongoose');
const Chocolate = require('../models/chocolate.js');
const fs = require('fs');
const path = require('path');

const MONGO_URI = 'mongodb://127.0.0.1:27017/chococrave';

const readJSONFile = (fileName) => {
  const filePath = path.join(__dirname, fileName);
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

const seedChocolates = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const chocolatesData = readJSONFile('chocolates.json');

    for (const chocolate of chocolatesData) {
      await Chocolate.updateOne(
        { name: chocolate.name },
        { $set: chocolate },
        { upsert: true }
      );
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding the chocolates:', error);
    await mongoose.disconnect();
  }
};

seedChocolates();
