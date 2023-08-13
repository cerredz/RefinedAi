const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  picturePath: String,
});

const Image = mongoose.model("Image", imageSchema);
module.exports = Image;
