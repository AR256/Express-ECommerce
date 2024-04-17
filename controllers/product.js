const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getProductById = async (req, res) => {
  res.json(res.product);
}
const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
    seller: req.user._id,
    creationDate: req.body.creationDate
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

}
const updateProduct = async (req, res) => {
  if (req.body.name != null) {
    res.product.name = req.body.name;
  }
  if (req.body.description != null) {
    res.product.description = req.body.description;
  }
  if (req.body.photo != null) {
    res.product.photo = req.body.photo;
  }
  if (req.body.seller != null) {
    res.product.seller = req.body.seller;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}
const deleteProduct = async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Middleware to get a specific product by ID
const getProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
}
module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, getProduct }