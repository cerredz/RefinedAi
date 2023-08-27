/* JSON DATA FOR PURCHASE SCREEN */
import paypalIcon from "../../components/assets/paypal.png";
import stripeIcon from "../../components/assets/stripe.png";
import googlePay from "../../components/assets/googlepay.png";

export const monthNames = [
  "January",
  "Feburary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const paymentMethodData = [
  {
    payment_method: "PayPal",
    img_src: paypalIcon,
    payment_method_description: "Pay with your PayPal account",
  },
  {
    payment_method: "Stripe",
    img_src: stripeIcon,
    payment_method_description: "Pay with your Stripe account",
  },
  {
    payment_method: "Google Pay",
    img_src: googlePay,
    payment_method_description: "Pay with your Google Pay account",
  },
];
