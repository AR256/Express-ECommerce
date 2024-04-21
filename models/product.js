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
    default: "/images/users/default.png"
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seller"
  },
},
{ timestamps: true });
productSchema.index({ name: "text" });

module.exports = mongoose.model("Product", productSchema);
