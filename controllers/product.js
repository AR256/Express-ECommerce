const Product = require("../models/product");
const user = require("../models/user");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('seller');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAuthProducts = async (req, res) => {
  try {
    let products;
    if (req.query.hasOwnProperty("name")) {
      products = await Product.find({ name: req.query.name }, {}).populate('seller');
    } else if (req.query.hasOwnProperty("sname")) {
      const seller = await user.findOne({ username: req.query.sname }, {});
      products = await Product.find({ seller: seller._id }, {}).populate('seller');
    } else {
      products = await Product.find().populate('seller');
    }

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getProductById = async (req, res) => {
  res.json(res.product);
};
const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
    creationDate: req.body.creationDate,
    seller: req.user.id,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
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
};
const deleteProduct = async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware to get a specific product by ID
const getProduct = async (req, res, next) => {
  let product;
  try {
    product = await Product.findById(req.params.id).populate('seller');
    if (product == null) {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.product = product;
  next();
};
module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getAuthProducts,
};
