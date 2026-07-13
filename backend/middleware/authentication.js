const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/config');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, jwtSecret);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token verification failed' });
  }
};