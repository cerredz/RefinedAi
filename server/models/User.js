const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 50,
  },
  username: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  picturePath: {
    type: String,
    default: "",
  },
  credits: {
    type: Number,
    default: 20,
  },
  images: {
    type: Array,
    default: [],
  },
  paymentID: {
    type: Array,
    default: [],
  },
  reviews: {
    type: Array,
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
