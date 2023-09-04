import React from "react";
import {
  Features,
  Navbar,
  Upscale,
  AdvertCards,
  CreditsAdvert,
} from "../../components/components";
import "./home.css";

const Home = (props) => {
  return (
    <div className="home-container">
      <div className="first-page-container">
        <Upscale />
        <CreditsAdvert />
      </div>

      <div className="second-page-container"></div>

      {/* 
      <AdvertCards />
      <Features />
      */}
    </div>
  );
};

export default Home;
