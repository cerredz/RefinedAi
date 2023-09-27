import React, { useState, useEffect } from "react";
import "./Credits.css";
import { getAllPriceData } from "../../client";
import { BiDollar } from "react-icons/bi";
import checkmark from "../assets/checkmark.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCreditID } from "../../state";

const Credits = (props) => {
  const [priceData, setPriceData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* GET PRICE DATA FROM THE BACKEND */
  useEffect(() => {
    async function fetchData() {
      const prices = await getAllPriceData();
      const sortedPriceData = prices.sort((a, b) => a.price - b.price);
      setPriceData(sortedPriceData);
    }
    fetchData();
  }, []);

  /* USER WANTS TO BUY CREDITS, REDIRECT THEM TO PURCHASE SCREEN */
  const handlePurchaseClick = async (id) => {
    dispatch(setCreditID({ creditID: id }));
    navigate("/purchase");
  };

  return (
    <div className="credits-container">
      {priceData &&
        priceData.map((price, index) => (
          <div
            data-aos={index <= 2 ? "fade-left" : "fade-right"}
            id={`card-${price.tier}`}
            className={`credit-card`}
          >
            <span className="bottom-glow" />
            <span className="top-glow"></span>

            <div className="credit-banner flex">
              <div className="banner-img">
                <img src={price.picturePath} alt="" />
              </div>
              <div id={`price-${price.tier}`} className="credit-price flex">
                <BiDollar />
                <p className="price">{price.price}</p>
              </div>
            </div>
            <div className="credit-tier">
              <h3 className="tier">{price.tier}</h3>
            </div>
            <div className="credit-facts">
              <ul>
                <li className="flex">
                  <img src={checkmark} alt="" />
                  <p>{price.credits} credits</p>
                </li>
                <li className="flex">
                  <img src={checkmark} alt="" />
                  <p>4k Image Quality</p>
                </li>
                <li className="flex">
                  <img src={checkmark} alt="" />
                  <p>Latest AI Technology</p>
                </li>
                <li className="flex">
                  <img src={checkmark} alt="" />
                  <p>Unlock All Upscaling Features</p>
                </li>
              </ul>
            </div>

            <div className="credit-button flex">
              <button
                onClick={() => handlePurchaseClick(price._id)}
                className={`btn-${price.tier}`}
              >
                Buy Now
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Credits;
