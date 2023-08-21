const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const Email = mongoose.model("Email", emailSchema);
module.exports = Email;
