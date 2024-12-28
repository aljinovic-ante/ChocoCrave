const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const { User } = require('../models/user');
const authenticateUser = require('../middleware/requireAuth');
const router = express.Router();

router.get('/:userId', authenticateUser, async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    const cartItems = await CartItem.find({ cart_id: cart._id }).populate('chocolate_id');
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while fetching the cart' });
  }
});

router.post('/add', authenticateUser, async (req, res) => {
  const { userId, chocolateId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      cart = new Cart({ user_id: userId });
      await cart.save();
    }

    const existingCartItem = await CartItem.findOne({
      cart_id: cart._id,
      chocolate_id: chocolateId,
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
      return res.status(200).json({ message: 'Cart updated', cartItem: existingCartItem });
    }

    const cartItem = new CartItem({
      cart_id: cart._id,
      chocolate_id: chocolateId,
      quantity,
    });

    await cartItem.save();

    res.status(200).json({ message: 'Item added to cart', cartItem });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

router.delete('/remove', authenticateUser, async (req, res) => {
  const { userId, chocolateId } = req.body;

  try {
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    const cartItem = await CartItem.findOneAndDelete({
      cart_id: cart._id,
      chocolate_id: chocolateId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

router.put('/update', authenticateUser, async (req, res) => {
  const { userId, chocolateId, quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user_id: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' });
    }

    const cartItem = await CartItem.findOne({
      cart_id: cart._id,
      chocolate_id: chocolateId,
    });

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in the cart' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ message: 'Cart item updated', cartItem });
  } catch (error) {
    console.error('Error updating cart item:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

module.exports = router;
