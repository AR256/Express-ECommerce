const express = require("express");
const router = express.Router();
const sellerController = require("../controllers/seller");
const auth = require("../middlewares/auth");
router.get("/", sellerController.getAllSellers);
router.get("/:name", sellerController.getByName);
router.post("/", auth.authenticateUser, sellerController.createSeller);

module.exports = router;
