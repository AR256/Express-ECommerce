const jwt = require("jsonwebtoken");
const Product = require("../models/product");
require("dotenv/config");

const authenticateUser = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is required" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = decoded.user;
    next();
  });
};
const authorizeSeller = (req, res, next) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Unauthorized access" });
  }
  if(req.params.id !== undefined) {
    const sellerId = req.user.id; // Assuming the seller's ID is stored in req.user._id after authentication
    const productId = req.params.id; // Assuming the product ID is passed as a route parameter
    // Check if the product's seller matches the logged-in seller's ID
    Product.findById(productId)
      .then((product) => {
        if (!product) {
          return res.status(404).send("Product not found");
        }
        if (product.seller.toString() !== sellerId) {
          return res
            .status(403)
            .send("Unauthorized - Seller can only access their own products");
        }
        
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Server Error");
      });
  }
  // Seller is authorized
  next();
};

module.exports = {
  authenticateUser,
  authorizeSeller,
};
