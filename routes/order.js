const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const auth = require('../middlewares/auth');

// Get all orders
router.get('/', auth.authenticateUser, orderController.getAllOrders);
router.get('/:userId', auth.authenticateUser, orderController.getOrdersByUser);
// Create a new order (accessible only to authenticated users)
router.post('/', auth.authenticateUser, orderController.createOrder);

module.exports = router;