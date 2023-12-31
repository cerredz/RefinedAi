import React, { useState, useEffect } from "react";
import "./ReviewAdvert.css";
import { useSelector } from "react-redux";
import neonrobot from "../assets/neonrobot.png";
import { BsPencilSquare } from "react-icons/bs";
import stars from "../assets/reviewStars.png";
import city from "../assets/city.jpg";
import { BlueParticles, PinkParticles } from "./Particles";
import { useNavigate } from "react-router-dom";
const ReviewAdvert = (props) => {
  const user = useSelector((state) => state.auth.user);
  const reviews = useSelector((state) => state.auth.stats);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    /* GET CURRENT DATE FOR EXAMPLE REVIEW CARD */
    const today = new Date();

    const month = today.getMonth();
    const day = today.getDate();
    const year = today.getFullYear();
    setDate(`${month}/${day}/${year}`);
  }, []);

  /* USER CLICKED THE LEAVE REVIEW BUTTON */
  const handleLeaveReviewClick = () => {
    if (!user) return navigate("/login");

    navigate("/reviews?write=true");
  };
  return (
    <div className="review-advert-container">
      <div className="review-advert-content flex">
        {/* HEADING / SUBHEADING / BUTTONS / STATS */}
        <div className="review-advert-text flex">
          <span className="blob blob-2"></span>
          <span className="blob blob-3"></span>
          <span className="blob blob-4"></span>

          <h1 data-aos="zoom-in" data-aos-offset="200" className="header">
            <span className="gradient-text">Customers</span> Love Our AI Image
            Upscaler
          </h1>
          <p data-aos="zoom-in" data-aos-offset="200" className="grey-text">
            Dont just take our word for it, hear what our customers have to say
            about our <span>AI Image Upscaler</span>
          </p>
          <div
            data-aos="zoom-in"
            data-aos-offset="200"
            className="text-buttons flex"
          >
            <button
              onClick={() => navigate("/reviews")}
              className="explore smooth-btn"
            >
              Explore
            </button>
            <button
              onClick={handleLeaveReviewClick}
              className="leave smooth-btn flex"
            >
              {" "}
              <BsPencilSquare />
              Leave a Review
            </button>
          </div>

          {/* REVIEW STATS */}
          <div
            data-aos="zoom-in"
            data-aos-offset="200"
            className="text-stats flex"
          >
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
          <div data-aos-offset="200" data-aos="fade-down" className="img">
            <span className="span-1"></span>
            <span className="span-2"></span>
            <span className="span-3"></span>
            <span className="span-4"></span>
            <span className="span-5 flex">4k</span>
            <span className="blob blob-1"></span>
            <BlueParticles />
            <PinkParticles />
          </div>

          {/* EXAMPLE REVIEW */}
          <div data-aos-offset="200" data-aos="fade-up" className="review">
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
