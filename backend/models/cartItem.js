const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
  chocolate_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Chocolate', required: true },
  quantity: { type: Number, required: true },
});

const CartItem = mongoose.model('CartItem', cartItemSchema);
module.exports = CartItem;
