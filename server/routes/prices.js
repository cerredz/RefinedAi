const express = require("express");
const Prices = require("../models/Prices");
const User = require("../models/User");
const paypal = require("paypal-rest-sdk");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const mongoose = require("mongoose");
const router = express.Router();

/* CONFIGURE PAYPAL API */
paypal.configure({
  mode: "sandbox",
  client_id: `${process.env.PAYPAL_CLIENT_ID}`,
  client_secret: `${process.env.PAYPAL_SECRET_KEY}`,
});

let stripe_payment_ids = new Map();

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

/* PAYPAL PAYMENT CANCELLED */
router.get("/cancel/paypal", (req, res) => {
  try {
    res.redirect("http://localhost:3000/");
  } catch (err) {
    console.log(err);
    res.status(500).json("Paypal Payment Cancelled");
  }
});

/* ATTEMPTS TO PURCHASE CREDITS FOR A USER USING STRIPE */
router.post("/stripe", async (req, res) => {
  try {
    const { user, pricesID } = req.body;

    /* MAKE SURE WE HAVE VALID USER AND PAYMENT ID*/
    const userData = await User.findById(user._id);
    if (!userData) return res.status(404).json("Invalid User ID");

    const paymentData = await Prices.findById(pricesID);
    if (!paymentData || paymentData.length === 0)
      return res.status(404).json("Could Not Find Credit Package");

    //must encode user and payment data, so we can send info to //success paypal link
    const encodedUserID = encodeURIComponent(JSON.stringify(user._id));
    const encodedPaymentDataID = encodeURIComponent(
      JSON.stringify(paymentData._id)
    );

    if (!stripe_payment_ids.get(`${userData.username}`)) {
      stripe_payment_ids.set(`${userData.username}`, []);
    }
    const paymentDataJSON = JSON.parse(JSON.stringify(paymentData));

    const config = {
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.BACKEND_URL}/credits/stripe/success?userID=${encodedUserID}&payment=${encodedPaymentDataID}`,
      cancel_url: `${process.env.BACKEND_URL}/credits/stripe/cancel`,
      line_items: [
        {
          price_data: {
            product_data: {
              name: paymentDataJSON.tier,
            },
            unit_amount: paymentData.priceInCents,
            currency: "usd",
          },

          quantity: 1,
        },
      ],
    };

    const stripePayment = await stripe.checkout.sessions.create(config);
    stripe_payment_ids.get(`${userData.username}`).push(stripePayment.id);
    res.status(200).json({ url: stripePayment.url });
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed to Make Stripe Payment");
  }
});

/* STRIPE PAYMENT SUCCESSFUL */
router.get("/stripe/success", async (req, res) => {
  try {
    const userID = JSON.parse(req.query.userID);
    const paymentID = JSON.parse(req.query.payment);

    console.log(req.query);

    const user = await User.findById(userID);
    if (!user) return res.status(404).json("User Not Found");

    const price = await Prices.findById(paymentID);
    if (!price) return res.status(404).json("Price Not Found");

    /* GET MOST RECENT STRIPE PAYMENT ID OF CURRENT USER */
    const stripePayments = stripe_payment_ids.get(`${user.username}`);
    const stripePaymentID = stripePayments[stripePayments.length - 1];

    user.paymentID.push(stripePaymentID);
    await user.save();

    res.redirect(
      `http://localhost:3000/success/${price.credits}/${stripePaymentID}/${price.price}/Stripe`
    );
  } catch (err) {
    console.log(err);
    res.status(500).json("Failed To Update User Account's Information");
  }
});

/* STRIPE PAYMENT CANCELLED */
router.get("/stripe/cancel", (req, res) => {
  try {
    res.redirect("http://localhost:3000/");
  } catch (err) {
    console.log(err);
    res.status(500).json("Stripe Payment Cancelled");
  }
});

module.exports = router;
