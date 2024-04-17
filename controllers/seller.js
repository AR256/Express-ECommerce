const Seller = require('../models/seller');

const getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find();
    res.json(sellers);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const getByName = async (req, res) => {
  const { name } = req.params;
  try {
    let seller = await Seller.find({ name: name }, {});
    res.json(seller);
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
}
const createSeller = async (req, res) => {
  const seller = new Seller({
    name: req.body.name
  });

  try {
    const newSeller = await seller.save();
    res.status(201).json(newSeller);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllSellers, getByName, createSeller };