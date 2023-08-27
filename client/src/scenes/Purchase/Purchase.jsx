import React, { useState, useEffect } from "react";
import "./Purchase.css";
import { useSelector, useDispatch } from "react-redux";
import { setCreditID, setEraseCreditId } from "../../state";
import cart from "../../components/assets/cart.png";
import info from "../../components/assets/info.png";
import Axios from "axios";
import { getPurchaseData } from "../../client";
import { monthNames, paymentMethodData } from "./PurchaseInfo";
import { IoIosArrowForward } from "react-icons/io";

const Purchase = (props) => {
  const user = useSelector((state) => state.auth.user);
  const id = useSelector((state) => state.auth.creditID);
  const dispatch = useDispatch();

  const [purchaseData, setPurchaseData] = useState([]);
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [paymentMethod, setPaymentMethod] = useState([0]);
  const [errors, setErrors] = useState({});

  /* GET THE CORRECT PURCHASE FROM THE BACKEND */
  useEffect(() => {
    async function fetchData() {
      const purchaseDataJSON = await getPurchaseData(id);
      setPurchaseData(purchaseDataJSON);
    }

    /* ORDER DETAILS */
    const today = new Date();
    const currentMonth = today.getMonth();
    setMonth(monthNames[currentMonth]);
    setDay(today.getDate());
    setYear(today.getFullYear());

    if (id) {
      fetchData();
    }
  }, []);
  /* USER CHANGED PAYMENT METHODS */
  const handlePaymentMethodClick = (index) => {
    const newArray = [];
    newArray.push(index);
    setPaymentMethod(newArray);
    setErrors({});
  };

  /* ATTEMPT TO MAKE A PURCHASE FOR THE USER */
  const handleBuyNowClick = async (id) => {
    /* HANDLE ERRORS */
    if (paymentMethod.length > 1) {
      //didnt select a payment method
      setErrors({ payment_method: true });
      return;
    }

    if (!id || id === "") {
      //no purchase package selected
      return;
    }

    /* PAYPAL PAYMENT */
    if (paymentMethod.includes(0)) {
      const paymentRequest = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/credits/paypal`,
        {
          user: user,
          pricesID: id,
        }
      );

      const redirectURL = paymentRequest.data.approval_url;
      const newWindow = window.open(redirectURL, "_blank");

      console.log(paymentRequest);
    }
  };

  return (
    <div className="purchase-container">
      {!id && <h1>Please Do Not Refresh Page When Purchasing Credits</h1>}

      {purchaseData ? (
        <>
          {/* TOP IMAGE*/}
          <div className="purchase-icon-container flex">
            <img src={purchaseData.picturePath} alt="" />
          </div>

          <div className="cart-container flex">
            <img src={cart} alt="cart-icon" />
            <p>Cart</p>
          </div>

          {/* PACKAGE NAME*/}
          <div className="purchase-data-container">
            <h1 className="tier">{purchaseData.tier} Package</h1>
            <hr />

            <div className="purchase-info">
              {/* ORDER INFO */}
              <div className="purchase-info-banner flex">
                <h3>Order Info</h3>
                <img src={info} alt="" />
              </div>
              <div className="purchase-info-content flex">
                <div className="purchase-detail flex">
                  <p className="grey-text">Credits: </p>
                  <p className="grey-text">{purchaseData.credits}</p>
                </div>
                <div className="purchase-detail flex">
                  <p className="grey-text">Order Date: </p>
                  <p className="grey-text">
                    {month} {day}, {year}
                  </p>
                </div>
                <div className="purchase-detail flex">
                  <p className="grey-text">Order Total: </p>
                  <p className="grey-text">$ {purchaseData.price}</p>
                </div>
              </div>
              <hr />
            </div>

            <div className="payment-methods">
              <h3 className="title">Payment Methods</h3>
              {errors.payment_method && (
                <p className="error">Payment Method Required</p>
              )}
              {paymentMethodData.map((payment, index) => (
                <>
                  {paymentMethod.includes(index) && (
                    <div key={index} className="payment-container flex">
                      {/* PAYMENT NAME AND PAYMENT ICON ON THE LEFT */}
                      <div
                        onClick={() => handlePaymentMethodClick(index)}
                        className="payment-method flex"
                      >
                        <div className="payment-icon-container flex">
                          <img src={payment.img_src} alt="" />
                        </div>
                        <div className="payment-names-container flex">
                          <h3 className="method">{payment.payment_method}</h3>
                          <p className="grey-text">
                            {payment.payment_method_description}
                          </p>
                        </div>
                      </div>

                      {/* ARROW ON THE RIGHT */}
                      <div
                        onClick={() => setPaymentMethod([0, 1, 2])}
                        className="arrow-container flex"
                      >
                        <IoIosArrowForward />
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
            <hr />

            <div className="price-container">
              <h1 className="price">${purchaseData.price}</h1>
              <p className="grey-text"> Enjoy Your Credits</p>

              <div
                onClick={() => handleBuyNowClick(id)}
                className="btn-container flex"
              >
                <button
                  onClick={() => handleBuyNowClick(id)}
                  className="buy-now"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Loading Purchase...</h1>
        </>
      )}
    </div>
  );
};

export default Purchase;
