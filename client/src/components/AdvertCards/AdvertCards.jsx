import React, { useState, useEffect } from "react";
import credits from "../assets/credits.png";
import gallary from "../assets/gallary.png";
import aiupscaling from "../assets/ai-upscaling.png";
import reviews from "../assets/reviews.png";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./AdvertCards.css";

/* CARDS CONTENT */
const cardsData = [
  {
    image: credits,
    heading: "Credits",
    subheading:
      "Purchase credits and open the door to enhancing all your images with our premium upscaling service. ",
    action: "Buy Credits",
    btnClassName: "credits",
    cardClassName: "credits-container",
    redirect: "/credits",
  },
  {
    image: gallary,
    heading: "Gallary",
    subheading:
      "Immerse yourself in a vast visual journey through the creations of our community.",
    action: "View Gallary",
    btnClassName: "gallary",
    cardClassName: "gallary-container",
    redirect: "/collection",
  },
  {
    image: aiupscaling,
    heading: "AI Upscaling",
    subheading:
      "Learn About the behind the scenes of RefinedAI's AI upscaling algorithm.",
    action: "View Algorithmn",
    btnClassName: "algorithmn",
    cardClassName: "algorithmn-container",
    redirect: "/algorithmn",
  },
  {
    image: reviews,
    heading: "Reviews",
    subheading:
      "Step into a world of shared experiences as we bring you authentic accounts of our users' experiences.",
    action: "View Reviews",
    btnClassName: "reviews",
    cardClassName: "reviews-container",
    redirect: "/reviews",
  },
];
const AdvertCards = () => {
  const [cards, setCards] = useState(cardsData);
  const navigate = useNavigate();
  return (
    <div className="advert-container flex">
      {/* CARDS*/}
      {cards &&
        cards.map((card, index) => (
          <div className={`card-container flex ${card.cardClassName}`}>
            <div className="img-container">
              <img src={card.image} alt="" />
            </div>

            <div className="text-container flex">
              <h1>{card.heading}</h1>
              <p className="grey-text">{card.subheading}</p>

              <div className="btn-container">
                <button
                  onClick={() => navigate(`${card.redirect}`)}
                  className={`flex ${card.btnClassName}`}
                >
                  {card.action} <BsArrowRight />
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AdvertCards;
