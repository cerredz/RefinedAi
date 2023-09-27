import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReviews } from "../../state";
import { BsPencil } from "react-icons/bs";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";

import Axios from "axios";

import "./Reviews.css";
import { Navbar } from "../../components/components";
import img1 from "../../components/assets/review1.jpg";
import img2 from "../../components/assets/review2.jpg";
import img3 from "../../components/assets/review3.jpg";
import img4 from "../../components/assets/review4.jpg";
import star from "../../components/assets/star.png";

const images = [
  {
    img: img1,
    title: "Image Enhancement",
  },
  {
    img: img2,
    title: "Sharper Details",
  },
  {
    img: img3,
    title: "Clear Resolution",
  },
  {
    img: img4,
    title: "Pixel Perfection",
  },
];

const Reviews = (props) => {
  const user = useSelector((state) => state.auth.user);
  const reviews = useSelector((state) => state.auth.reviews);
  const [isWritingReview, setIsWritingReview] = useState(false);
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewDesciption, setReviewDescription] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const write = queryParams.get("write");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReviewChange = (event) => {
    setReviewDescription(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  //cancel review
  const handleCancelReview = () => {
    setReviewDescription("");
    setReviewStars(5);
    setIsWritingReview(false);
  };

  //submit review
  const handleReviewSubmit = async () => {
    if (!user) {
      //user not logged in, redirect to login
      navigate("/login");
      return;
    }
    try {
      /* POST REVIEW DETAILS TO BACKEND */
      const createReview = await Axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/reviews/create`,
        {
          user: user,
          description: reviewDesciption,
          stars: reviewStars,
        }
      );
      /* GET RETURNED REVIEW DATA */
      const allReviews = createReview.data;

      /* FILTER DATA TO LIMIT TO 1 REVIEW PER PERSON*/
      const uniqueReviews = [];
      const usernamesSet = new Set();

      allReviews.forEach((review) => {
        if (!usernamesSet.has(review.username)) {
          const wordArray = review.description.split(/\s+/);
          const wordCount = wordArray.length;

          if (wordCount < 50) {
            usernamesSet.add(review.username);
            uniqueReviews.push(review);
          }
        }
      });
      dispatch(setReviews({ reviews: uniqueReviews }));
      setIsWritingReview(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (write === "true") {
      // user clicked "leave review" button on home page
      setIsWritingReview(true);
    }

    console.log(write);
  }, []);
  return (
    <div className="review-container">
      <Navbar />

      <div className="review-content ">
        {/* REVIEW POPUP*/}
        {isWritingReview && (
          <div className="review-popup flex">
            <div className="review-card">
              <div className="star-container flex">
                <img className="star" src={star} alt="star" />
                <img className="star" src={star} alt="star" />
                <img className="star" src={star} alt="star" />
                <img className="star" src={star} alt="star" />
                <img className="star" src={star} alt="star" />
              </div>

              <div className="description flex">
                <BsPencil />
                <textarea
                  className="expanding-input review-input"
                  rows="1"
                  placeholder="Your Review"
                  value={reviewDesciption}
                  onChange={handleReviewChange}
                />
              </div>

              <div className="rating ">
                <label for="cars">Rate Us:</label>
                <br />

                <select
                  name="cars"
                  id="cars"
                  onChange={(event) => setReviewStars(event.target.value)}
                >
                  <option></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="btn-container">
                <button onClick={handleReviewSubmit} className="submit flex">
                  {" "}
                  <AiOutlineCheck />
                  Submit
                </button>
                <button onClick={handleCancelReview} className="cancel flex">
                  <AiOutlineClose />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        <div data-aos="zoom-in" className="review-banner flex">
          {/* BANNER AT TOP OF SCREEN*/}
          <div className="review-header flex">
            <h1>See Why Customers Love RefinedAI</h1>
            <p className="grey-text">
              At RefinedAI, we put our customers at the heart of every pixel.
              Our top-tier services are a testament to our mission of uplifting
              your content and your satisfaction. Dont believe us? Feel free to
              browse your fellow customers reviews
            </p>
          </div>

          <div className="image-container">
            {images &&
              images.map((image, index) => (
                <div key={index} className="card-container">
                  <img src={image.img} alt="upscaled" />
                  <h4>{image.title}</h4>
                </div>
              ))}
          </div>
        </div>

        <div className="reviews">
          <div data-aos="zoom-in" className="btn-container flex">
            <button onClick={() => setIsWritingReview(true)}>
              Leave Review
            </button>
          </div>

          <div className="user-reviews-container flex">
            {reviews.map((review, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-offset="200"
                className="user-container"
              >
                <div className="stars-container">
                  <img className="star" src={star} alt="star" />
                  <img className="star" src={star} alt="star" />
                  <img className="star" src={star} alt="star" />
                  <img className="star" src={star} alt="star" />
                  <img className="star" src={star} alt="star" />
                </div>

                <div className="user-info flex  ">
                  {review.picturePath === "" ? (
                    ""
                  ) : (
                    <img
                      className="pfp"
                      src={review.picturePath}
                      alt="pfp"
                    ></img>
                  )}
                  {review.username}
                </div>

                <div className="review-info">
                  <p>{review.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
