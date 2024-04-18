const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const auth = require('../middlewares/auth');
router.get('/a/', auth.authenticateUser, productController.getAuthProducts);
router.get('/', productController.getAllProducts);
router.get('/:id', auth.authenticateUser, productController.getProduct, productController.getProductById);
router.post('/', auth.authenticateUser, auth.authorizeSeller, productController.createProduct);
router.put('/:id', auth.authenticateUser, auth.authorizeSeller, productController.getProduct, productController.updateProduct);
router.delete('/:id', auth.authenticateUser, auth.authorizeSeller, productController.getProduct, productController.deleteProduct);

module.exports = router;