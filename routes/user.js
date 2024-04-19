const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

// Register a new user
router.post("/register", userController.registerUser);

// Login user
router.post("/login", userController.loginUser);

//edit data
router.put("/edit/:id", auth.authenticateUser, userController.editUser);

module.exports = router;
