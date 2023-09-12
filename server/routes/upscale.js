const express = require("express");
const User = require("../models/User");
const Image = require("../models/Image");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const Replicate = require("replicate");
const Axios = require("axios");
const fs = require("fs");
const sharp = require("sharp");

/* API UPSCALER DEPDENCIES */
const FormData = require("form-data");
const { DOUBLE } = require("mysql/lib/protocol/constants/types");

/* MULTER SETUP (File Storage) */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Public/assets");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = crypto.randomBytes(20).toString("hex");
    const fileName = path.extname(file.originalname);
    const storedFileName = `${uniqueFileName}${fileName}`;
    cb(null, storedFileName);
  },
});

const upload = multer({ storage: storage });

/* REPLICATE SETUP (UPSCALER) */
const replicate = new Replicate({
  auth: `${process.env.REPLICATE_API_KEY}`,
});

const router = express.Router();

router.post("/image", upload.single("picture"), async (req, res) => {
  try {
    const { userString, height, picture } = req.body;
    const jsonUser = JSON.parse(userString);

    // extract image path
    const imagePath = encodeURIComponent(req.file.filename);
    const absoluteImagePath = `public/assets/${imagePath}`;

    const userId = jsonUser._id;

    // read the image file
    const formData = new FormData();
    formData.append("image", fs.readFileSync(absoluteImagePath));

    // pass the image into stability ai api

    const upscale = await Axios({
      method: "post",
      url: "https://api.stability.ai/v1/generation/esrgan-v1-x2plus/image-to-image/upscale",
      headers: {
        ...formData.getHeaders(),
        Accept: "application/json",
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
      },
      data: formData,
    });

    const response = upscale.data;

    /* SAVE UPSCALED IMAGE TO OUTPUT PATH */
    const artifacts = response.artifacts;
    const outputPath = path.join(
      "public/assets/upscaled",
      path.basename(imagePath)
    );
    const firstImage = artifacts[0];
    const imageBuffer = Buffer.from(firstImage.base64, "base64");
    fs.writeFileSync(outputPath, imageBuffer);

    /* EXTRACT IMAGE INFORMATION */
    let imgWidth = 0;
    let imgHeight = 0;
    let imgSize = 0;
    let aspectRatio = "";
    let imgFormat = "";

    await sharp(imageBuffer)
      .metadata()
      .then((metadata) => {
        imgWidth = metadata.width;
        imgHeight = metadata.height;
        imgSize = metadata.size;
        imgFormat = metadata.format;
      })
      .catch((err) => {
        console.error("Error getting image metadata:", err);
      });

    function gcd(a, b) {
      return b == 0 ? a : gcd(b, a % b);
    }

    const greatestCommonDenominator = gcd(imgWidth, imgHeight);
    aspectRatio = `${imgWidth / greatestCommonDenominator} : ${
      imgHeight / greatestCommonDenominator
    }`;

    /* STORE IMAGE INFORMATION INTO DATABASE */

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ msg: "User Not Found" });

    /* STORE UPSCALED IMAGE INTO DATABASE */

    const newImage = new Image({
      userID: userId,
      picturePath: path.basename(imagePath),
      width: imgWidth,
      height: imgHeight,
      size: imgSize,
      aspectRatio: aspectRatio,
      format: imgFormat,
    });

    await newImage.save();

    /* UPDATE USER INFORMATION */

    user.images.push(path.basename(imagePath));
    user.credits = user.credits - 1;

    await user.save();

    return res.status(200).json({
      user: user,
      image: imagePath,
      imageObj: newImage,
    });
  } catch (error) {
    if (error.response) {
      //error is from stability ai api
      const errorCode = error.response.request.res.statusCode;
      if (errorCode === 400) {
        //image inputted is too big for upscaler api

        return res.status(200).json({ message: "Image Input Too Big" });
      }
    }
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

/* Send Image to Frontend*/
router.get("/Public/assets/:path", async (req, res) => {
  try {
    /* Construct Path of Image in Backend*/
    const imagePath = req.params.path;
    const absoluteImagePath = path.join(
      __dirname,
      "..",
      "public",
      "assets",
      imagePath
    );

    /* Send Image File to Frontend */
    res.sendFile(absoluteImagePath);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to Extract Image");
  }
});

router.get("/Public/assets/upscaled/:path", async (req, res) => {
  try {
    /* Construct Path of Image in Backend*/
    const imagePath = req.params.path;
    const absoluteImagePath = path.join(
      __dirname,
      "..",
      "public",
      "assets",
      "upscaled",
      imagePath
    );

    /* Send Image File to Frontend */
    res.sendFile(absoluteImagePath);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to Extract Image");
  }
});

module.exports = router;
