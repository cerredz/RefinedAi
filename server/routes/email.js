const express = require("express");
const router = express.Router();
const Email = require("../models/Email");
const User = require("../models/User");

/* CHECK IF A USER IS IN THE EMAIL LIST */
router.post("/checkUser", async (req, res) => {
  try {
    const { _id, username } = req.body;

    console.log("Cheking if ", username, " is in the email list...");
    const checkUser = await User.findById(_id);
    if (!checkUser) return res.status(404).json("User Not Found");

    const inEmailList = await Email.find({ userID: _id });
    if (inEmailList.length === 0) return res.status(200).json(false);
    res.status(200).json(true);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to Check Email List Collection");
  }
});
module.exports = router;
