import React, { useState, useEffect } from "react";
import "./Credits.css";
import { getPriceData } from "../../client";

const Credits = (props) => {
  const [priceData, setPriceData] = useState([]);

  /* GET PRICE DATA FROM THE BACKEND */
  useEffect(() => {
    async function fetchData() {
      const prices = await getPriceData();
      setPriceData(prices);
    }
    fetchData();
  }, []);
  return (
    <div>
      {priceData &&
        priceData.map((price, index) => (
          <div>
            <h1>{price.credits}</h1>
            <img src={price.picturePath} alt="" />
            <h1>{price.price}</h1>
          </div>
        ))}
    </div>
  );
};

export default Credits;
