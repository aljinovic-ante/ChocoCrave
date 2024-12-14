const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    location: { type: String },
    image: { type: String },
    description: { type: String },
    website: { type: String },
  });
  
  const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);
  module.exports = Manufacturer;  