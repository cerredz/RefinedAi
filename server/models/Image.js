const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userProfilePicture: {
    type: String,
    required: true,
  },
  picturePath: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  aspectRatio: {
    type: String,
    required: true,
  },
  format: {
    type: String,
    required: true,
  },
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
