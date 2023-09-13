import React, { useEffect } from "react";
import { Features, Upscale, CreditsAdvert } from "../../components/components";
import "./home.css";
import { scrollToTop } from "../../client";

const Home = (props) => {
  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="home-container">
      <div className="first-page-container">
        <Upscale />
        <CreditsAdvert />
        <Features />
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
