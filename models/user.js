const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "seller"], default: "user" },
    image: {
      type: String,
      required: true,
      default: "/images/users/default.png",
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
      min: 12,
    },
    address: String,
    city: String,
    cart: {
      totalPrice: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

// Hash password before saving user to the database
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error);
  }
});

// Custom method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
