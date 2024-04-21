const Order = require("../models/order");

// Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get orders for a specific user
const getOrdersByUser = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId });
    res.json(orders); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  const order = new Order({
    products: req.body.products,
    user: req.user._id,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  getOrdersByUser,
  createOrder,
};
