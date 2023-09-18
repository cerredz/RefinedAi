import React, { useState, useEffect } from "react";
import "./ReviewAdvert.css";
import { useSelector } from "react-redux";
import neonrobot from "../assets/neonrobot.png";
import { BsPencilSquare } from "react-icons/bs";
import stars from "../assets/reviewStars.png";
import city from "../assets/city.jpg";
const ReviewAdvert = (props) => {
  const reviews = useSelector((state) => state.auth.stats);
  const [date, setDate] = useState(null);

  useEffect(() => {
    /* GET CURRENT DATE FOR EXAMPLE REVIEW CARD */
    const today = new Date();

    const month = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();
    setDate(`${month}/${day}/${year}`);
  }, []);
  return (
    <div className="review-advert-container">
      <div className="review-advert-content flex">
        {/* HEADING / SUBHEADING / BUTTONS / STATS */}
        <div className="review-advert-text flex">
          <h1 className="header">
            <span className="gradient-text">Customers</span> Love Our AI Image
            Upscaler
          </h1>
          <p className="grey-text">
            Dont just take our word for it, hear what our customers have to say
            about our <span>AI Image Upscaler</span>
          </p>
          <div className="text-buttons flex">
            <button className="explore smooth-btn">Explore</button>
            <button className="leave smooth-btn flex">
              {" "}
              <BsPencilSquare />
              Leave a Review
            </button>
          </div>

          <div className="text-stats flex">
            <div className="stat">
              <h3>{reviews.totalReviews}+</h3>
              <p className="grey-text">Total Reviews</p>
            </div>
            <div className="stat">
              <h3>{reviews.totalFiveStarReviews}+</h3>
              <p className="grey-text">5 Star Reviews</p>
            </div>
            <div className="stat">
              <h3>{reviews.totalUsers}+</h3>
              <p className="grey-text">Satisfied Customers</p>
            </div>
          </div>
        </div>
        {/* IMAGE / REVIEW CARD */}
        <div className="review-advert-image flex">
          <div className="img">
            <span className="span-1"></span>
            <span className="span-2"></span>
            <span className="span-3"></span>
            <span className="span-4"></span>
          </div>

          <div className="review">
            <div className="banner flex">
              <div className="stars flex">
                <p className="grey-text">Stars</p>
                <img src={stars} alt="star" />
                <img src={stars} alt="star" />
                <img src={stars} alt="star" />
                <img src={stars} alt="star" />
                <img src={stars} alt="star" />
              </div>

              <p className="grey-text">{date}</p>
            </div>

            <div className="user flex">
              <img src={city} alt="city" />
              <p>retto</p>
            </div>

            <div className="text">
              <p className="grey-text">
                RefinedAI turned my once fuzzy roads and blurry buildings into
                highly detailed and clear architecture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewAdvert;
