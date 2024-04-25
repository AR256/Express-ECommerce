const Product = require("../models/product");
const user = require("../models/user");
const multer = require("multer");
const path = require("path");
let imagePath;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/products/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    imagePath =
      `${req.body.name.replace(" ", "")}_${req.user.id}_${Date.now()}` +
      path.extname(file.originalname);
    cb(null, imagePath);
  },
});
const upload = multer({ storage: storage });

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Page number, default to 1
  const pageSize = parseInt(req.query.pageSize) || 10;
  try {
    const skip = (page - 1) * pageSize;
    const products = await Product.find()
      .skip(skip)
      .limit(pageSize)
      .populate("seller");
    const totalProducts = await Product.countDocuments();
    res.json({
      status: "success",
      data: products,
      TotalProductsCount: totalProducts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAuthProducts = async (req, res) => {
  try {
    let products;
    //find by product name
    if (req.query.hasOwnProperty("name")) {
      products = await Product.find({ name: req.query.name }, {}).populate(
        "seller"
      );
    }
    //find by seller name
    else if (req.query.hasOwnProperty("sname")) {
      const seller = await user.findOne({ username: req.query.sname }, {});
      products = await Product.find({ seller: seller._id }, {}).populate(
        "seller"
      );
    }
    //get all products
    else {
      products = await Product.find().populate("seller");
    }

    res.json({
      status: "success",
      data: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getProductById = async (req, res) => {
  res.json({
    status: "success",
    data: res.product,
  });
};

const createProduct = async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    photo: "/images/products/" + imagePath,
    seller: req.user.id,
    price: req.body.price,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json({
      status: "success",
      data: newProduct,
    });
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
  if (req.body.price != null) {
    res.product.price = req.body.price;
  }
  try {
    const updatedProduct = await res.product.save();
    res.json({
      status: "success",
      data: updatedProduct,
    });
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
    product = await Product.findById(req.params.id).populate("seller");
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
  upload,
};
