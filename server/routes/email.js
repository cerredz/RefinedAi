const express = require("express");
const router = express.Router();
const Email = require("../models/Email");
const User = require("../models/User");

/* CHECK IF A USER IS IN THE EMAIL LIST */
router.post("/checkUser", async (req, res) => {
  try {
    const { _id, username } = req.body;

    const checkUser = await User.findById(_id);
    if (!checkUser) return res.status(404).json("User Not Found: Invalid ID");

    const inEmailList = await Email.find({ userID: _id });
    if (inEmailList.length === 0) return res.status(200).json(false);
    res.status(200).json(true);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to Check Email List Collection");
  }
});

/* ADDS A USER'S EMAIL TO THE EMAIL LIST */
router.post("/join", async (req, res) => {
  try {
    const { _id, username, email } = req.body;

    const user = await User.findById(_id);
    if (!user) return res.status(404).json("User Not Found: Invalid ID");

    const newEmail = new Email({
      userID: _id,
      username: username,
      email: email,
    });

    await newEmail.save();
    res.status(200).json(true);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to Add User to the Email List");
  }
});

/* REMOVES A USER'S EMAIL TO THE EMAIL LIST */
router.post("/leave", async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await User.findById(_id);
    if (!user) return res.status(404).json("User Not Found: Invalid ID");

    const userEmail = await Email.find({ userID: _id });
    if (!userEmail || userEmail.length == 0)
      return res
        .status(200)
        .json({ res: false, msg: "User Was Not In Email List" });

    await Email.deleteMany({ userID: _id });
    res.status(200).json({ res: true, msg: "User Removed from Email List" });
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to Remove User to the Email List");
  }
});
module.exports = router;
