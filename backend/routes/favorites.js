const express = require('express');
const mongoose = require('mongoose');
const Favorites = require('../models/favorites');
const FavoriteItem = require('../models/favoriteItem');
const { User } = require('../models/user');
const authenticateUser = require('../middleware/requireAuth');
const router = express.Router();

router.get('/:userId', authenticateUser, async (req, res) => {
  const { userId } = req.params;

  console.log(`HALOOOOO Received request to fetch favorites for user ID: ${userId}`);

  try {
    const objectId = new mongoose.Types.ObjectId(userId);

    const favorites = await Favorites.findOne({ user_id: objectId });
    console.log('Favorites fetched for user:', favorites);

    if (!favorites) {
      console.log('No favorites list found for user ID:', userId);
      return res.status(404).json({ message: 'Favorites not found for this user' });
    }

    const favoriteItems = await FavoriteItem.find({ favorites_id: favorites._id }).populate('chocolate_id');
    console.log(`Favorite items for favorites ID ${favorites._id}:`, favoriteItems);

    const favoriteChocolates = favoriteItems.map((item) => item.chocolate_id);
    console.log('Returning chocolates:', favoriteChocolates);

    res.status(200).json(favoriteChocolates);
  } catch (err) {
    console.error('Error fetching favorites:', err);
    res.status(500).json({ error: 'An error occurred while fetching favorites' });
  }
});

router.post('/add', authenticateUser, async (req, res) => {
  const { userId, chocolateId } = req.body;

  console.log('Received request to add to favorites:', { userId, chocolateId });

  try {
    let favorites = await Favorites.findOne({ user_id: userId });
    console.log('Found existing favorites:', favorites);

    if (!favorites) {
      console.log('No favorites found for this user. Creating new favorites list...');
      favorites = new Favorites({ user_id: userId });
      await favorites.save();
      console.log('New favorites list created:', favorites);
    }

    const existingFavorite = await FavoriteItem.findOne({
      favorites_id: favorites._id,
      chocolate_id: chocolateId,
    });
    console.log('Checking if chocolate is already in favorites:', existingFavorite);

    if (existingFavorite) {
      console.log('Chocolate already in favorites');
      return res.status(400).json({ message: 'Chocolate is already in your favorites' });
    }

    const favoriteItem = new FavoriteItem({
      favorites_id: favorites._id,
      chocolate_id: chocolateId,
    });
    console.log('Creating new favorite item:', favoriteItem);

    await favoriteItem.save();
    console.log('Chocolate added to favorites:', favoriteItem);

    res.status(200).json({ message: 'Chocolate added to favorites' });
  } catch (error) {
    console.error('Error adding to favorites:', error);
    res.status(500).json({ error: 'Failed to add chocolate to favorites' });
  }
});

router.delete('/remove', authenticateUser, async (req, res) => {
  const { userId, chocolateId } = req.body;

  try {
    const favorites = await Favorites.findOne({ user_id: userId });

    if (!favorites) {
      return res.status(404).json({ message: 'No favorites found for this user' });
    }

    const favoriteItem = await FavoriteItem.findOneAndDelete({
      favorites_id: favorites._id,
      chocolate_id: chocolateId,
    });

    if (!favoriteItem) {
      return res.status(404).json({ message: 'Chocolate not found in your favorites' });
    }

    res.status(200).json({ message: 'Chocolate removed from favorites' });
  } catch (error) {
    console.error('Error removing from favorites:', error);
    res.status(500).json({ error: 'Failed to remove chocolate from favorites' });
  }
});

module.exports = router;
