const jwt = require('jsonwebtoken');
require("dotenv/config");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = decoded.user;
    next();
  });
};
const authorizeSeller = (req, res, next) => {
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizeSeller
};