const express = require("express");
const Prices = require("../models/Prices");
const User = require("../models/User");
const paypal = require("paypal-rest-sdk");

const router = express.Router();

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
  const userData = User.findById(user._id);
  if (!userData) return res.status(404).json("Invalid User ID");

  const paymentData = await Prices.findById(pricesID);
  if (!paymentData || paymentData.length === 0)
    return res.status(404).json("Could Not Find Credit Package");

  /* CONFIGURE PAYPAL PAYMENT DATA */
  const paypal_payment_data = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    transactions: [
      {
        amount: {
          total: paymentData.priceInCents,
          currency: "USD",
        },

        description: "Payment for Goods / Services",
      },
    ],

    redirect_urls: {
      return_url: `http://localhost:3000/`,
      cancel_url: "http://localhost:3000/cancel/paypal",
    },
  };

  /* MAKE THE PAYPAL PAYMENT */
  const paypalPayment = await paypal.payment.create(
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

module.exports = router;
