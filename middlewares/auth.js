const jwt = require('jsonwebtoken');
require("dotenv/config");

const authenticateUser = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

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
  console.log(req.user);
  if (req.user.role !== 'seller') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizeSeller
};