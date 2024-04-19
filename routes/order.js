const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const auth = require("../middlewares/auth");

router.get("/", auth.authenticateUser, orderController.getAllOrders);
router.get("/:userId", auth.authenticateUser, orderController.getOrdersByUser);
router.post("/", auth.authenticateUser, orderController.createOrder);

module.exports = router;
