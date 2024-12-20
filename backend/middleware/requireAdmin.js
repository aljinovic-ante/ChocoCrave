const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ error: 'Access denied, unauthorized!' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    console.log('Verified user:', verified);

    if (!req.user.isAdmin) {
      console.log('User is not admin:', req.user);
      return res
        .status(403)
        .json({ error: 'Access denied, admin privileges required!' });
    }

    console.log('Admin authenticated');
    next();
  } catch (err) {
    console.log('Invalid token:', err.message);
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateAdmin;
