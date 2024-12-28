const mongoose = require('mongoose');

const chocolateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    cocoa_percentage: { type: Number, required: true },
    color: { type: String },
    type: { type: String },
    weight: { type: String },
    manufacturer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Manufacturer', required: true },
    description: { type: String },
    image: { type: String },
    nutritional_info: {
        calories: { type: Number },
        fat: { type: Number },
        protein: { type: Number },
        carbohydrates: { type: Number },
        sugar: { type: Number },
    },
  });
  
  const Chocolate = mongoose.model('Chocolate', chocolateSchema);
  module.exports = Chocolate;  