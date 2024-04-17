const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const auth = require('../middlewares/auth');
router.get('/', productController.getAllProducts);
router.post('/', auth.authenticateUser, productController.createProduct);
router.get('/:id', productController.getProduct, productController.getProductById);
router.put('/:id', auth.authenticateUser, productController.getProduct, productController.updateProduct);
router.delete('/:id', auth.authenticateUser, productController.getProduct, productController.deleteProduct);

module.exports = router;