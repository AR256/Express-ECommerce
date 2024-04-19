const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");
const auth = require("../middlewares/auth");
router.get("/auth", auth.authenticateUser, productController.getAuthProducts);
router.get("/", productController.getAllProducts);
router.get(
  "/auth/:id",
  auth.authenticateUser,
  productController.getProduct,
  productController.getProductById
);
router.post(
  "/auth",
  auth.authenticateUser,
  auth.authorizeSeller,
  productController.createProduct
);
router.put(
  "/auth/:id",
  auth.authenticateUser,
  auth.authorizeSeller,
  productController.getProduct,
  productController.updateProduct
);
router.delete(
  "/auth/:id",
  auth.authenticateUser,
  auth.authorizeSeller,
  productController.getProduct,
  productController.deleteProduct
);

module.exports = router;
