require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const paypal = require("paypal-rest-sdk");
const authRoutes = require("./routes/auth");
const upscaleRoutes = require("./routes/upscale");
const reviewsRoutes = require("./routes/reviews");
const emailRoutes = require("./routes/email");
const creditRoutes = require("./routes/prices");
const Prices = require("./models/Prices");
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/upscale", upscaleRoutes);
app.use("/reviews", reviewsRoutes);
app.use("/emails", emailRoutes);
app.use("/credits", creditRoutes);

/* CONFIGURE PAYPAL API */
paypal.configure({
  mode: "sandbox",
  client_id: `${process.env.PAYPAL_CLIENT_ID}`,
  client_secret: `${process.env.PAYPAL_SECRET_KEY}`,
});
/* CONNECT TO MONGODB DATABASE */
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server Port: ${PORT}`);
      console.log("Successfully Connected to the MongoDB Database");
    });
  })
  .catch((error) => {
    console.error("Error starting the server:", error);
  });
