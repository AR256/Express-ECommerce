const User = require("../models/user");
const { createSeller } = require("../controllers/seller");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const multer = require('multer');
const path = require('path');
let imagePath;
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './images/users/')
  },
  filename: (req, file, cb) => {
      console.log(file);
      imagePath = Date.now() + req.user.id + path.extname(file.originalname);
      cb(null, imagePath)
  }

});
const upload = multer({storage: storage })

// Controller for registering a new user
const registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Wrong Email or Password" });
    }

    // Create new user
    user = new User({ username, email, password, role });
    if (role === "seller") {
      createSeller(req, res);
    }
    // Save user to database
    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller for logging in a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Validate password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const editUser = async (req, res) => {
  const { username, email, role } = req.body;
  console.log(req.user);
  if (req.user.id !== req.params.id)
    return res.status(403).json({ message: "Invalid user" });
  try {
    res.user = await User.findById(req.params.id);
    if (!res.user) {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  if (username) {
    res.user.username = username;
  }
  if (email) {
    res.user.email = email;
  }
  if (role) {
    res.user.role = role;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  editUser,
  upload
};
