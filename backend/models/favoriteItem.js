const mongoose = require('mongoose');

const favoriteItemSchema = new mongoose.Schema({
    favorites_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Favorites', required: true },
    chocolate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chocolate', required: true },
});
  
favoriteItemSchema.index({ favorites_id: 1, chocolate_id: 1 }, { unique: true });
  
const FavoriteItem = mongoose.model('FavoriteItem', favoriteItemSchema);
module.exports = FavoriteItem;
  