const mongoose = require("mongoose");
let productSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
  },
  photo: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller",
  },
});
productSchema.index({ name: "text" });

module.exports = mongoose.model("Product", productSchema);
