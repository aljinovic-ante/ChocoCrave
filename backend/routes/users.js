const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const authenticateAdmin = require('../middleware/requireAdmin');

const router = express.Router();

router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const { username, email, isAdmin } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser && existingEmailUser._id.toString() !== req.params.id) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser && existingUsernameUser._id.toString() !== req.params.id) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.isAdmin = isAdmin ?? user.isAdmin;
    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

router.put('/:id/change-password', authenticateAdmin, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save({ validateBeforeSave: false });

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});

module.exports = router;