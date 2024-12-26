const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    console.log('No token');
    return res.status(401).json({ error: 'Access denied, unauthorized!' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified.isAdmin) {
      console.log('User is not admin:', verified);
      return res
        .status(403)
        .json({ error: 'Access denied, admin privileges required!' });
    }

    req.user = verified;
    next();
  } catch (err) {
    console.log('Invalid token:', err.message);
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authenticateAdmin;
