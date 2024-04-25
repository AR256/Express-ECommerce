const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');
require("dotenv/config");
const productRoutes = require("./routes/product");
const sellerRoutes = require("./routes/seller");
const orderRoutes = require("./routes/order");
const userRoutes = require("./routes/user");

const app = express();

// Middleware
app.use(morgan('dev')); 
app.use(cors());
app.use(express.json());

// Routes
app.use("api/v1/products", productRoutes);
app.use("api/v1/sellers", sellerRoutes);
app.use("api/v1/orders", orderRoutes);
app.use("api/v1/users", userRoutes);

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
