const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  });
  
const Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = Favorites;
  