const express = require("express");
const Prices = require("../models/Prices");
const User = require("../models/User");
const paypal = require("paypal-rest-sdk");

const router = express.Router();

/* CONFIGURE PAYPAL API */
paypal.configure({
  mode: "sandbox",
  client_id: `${process.env.PAYPAL_CLIENT_ID}`,
  client_secret: `${process.env.PAYPAL_SECRET_KEY}`,
});

/* FUNCTION TO SEND A SINGULAR PRICE OBJECT TO THE FRONTEND*/
router.get("/getPrice", async (req, res) => {
  try {
    const { _id } = req.query;

    const priceData = await Prices.findById(_id);
    if (!priceData) return res.status(404).json("Price Not Found");

    res.status(200).json(priceData);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to Get Access Price Database");
  }
});

/* FUNCTION TO SEND ALL PRICES TO THE FRONTEND */
router.get("/getAllPrices", async (req, res) => {
  try {
    const allPrices = await Prices.find();
    if (!allPrices) return res.status(404).json("Prices Not Found");
    res.status(200).json(allPrices);
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed To Send Price Information to the Frontend");
  }
});

/* FUNCTION TO PURCHASE CREDITS FOR A USER USING PAYPAL*/
router.post("/paypal", async (req, res) => {
  const { user, pricesID } = req.body;

  /* MAKE SURE WE HAVE VALID USER AND PAYMENT ID*/
  const userData = await User.findById(user._id);
  if (!userData) return res.status(404).json("Invalid User ID");

  const paymentData = await Prices.findById(pricesID);
  if (!paymentData || paymentData.length === 0)
    return res.status(404).json("Could Not Find Credit Package");

  //must encode user and payment data, so we can send info to //success paypal link
  const encodedUser = encodeURIComponent(JSON.stringify(user));
  const encodedPaymenData = encodeURIComponent(JSON.stringify(paymentData));

  /* CONFIGURE PAYPAL PAYMENT DATA */
  const paypal_payment_data = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: paymentData.price,
          currency: "USD",
        },

        description: "Payment for Goods / Services",
      },
    ],

    redirect_urls: {
      return_url: `${process.env.BACKEND_URL}/credits/paypal/success?user=${encodedUser}&payment=${encodedPaymenData}`,
      cancel_url: "http://localhost:3000/cancel/paypal",
    },
  };

  /* MAKE THE PAYPAL PAYMENT */
  const paypalPayment = paypal.payment.create(
    paypal_payment_data,
    async (error, payment) => {
      try {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.json({ approval_url: payment.links[i].href });
            break;
          }
        }
      } catch (err) {
        console.log(err);
        res.status(500).json("Error Making Paypal Payment");
      }
    }
  );
});

/* USER HAS COMPLETED A SUCCESSFUL PAYPAL PAYMENT */
router.get("/paypal/success", async (req, res) => {
  try {
    const user = JSON.parse(req.query.user);
    const payment = JSON.parse(req.query.payment);
    const { paymentId } = req.query;

    /* UPDATE CREDITS AND PAYMENT IDS FOR USER*/
    const userData = await User.findById(user._id);
    if (!userData) return res.status(404).json("User Not Found");

    userData.credits += payment.credits;
    userData.paymentID.push(paymentId);
    await userData.save();
    res.redirect(
      `http://localhost:3000/success/${payment.credits}/${paymentId}/${payment.price}/PayPal`
    );
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json("Failed To Add Credits to User's Account, Please Contact Support");
  }
});

module.exports = router;
