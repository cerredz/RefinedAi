import React from "react";
import {
  Features,
  Navbar,
  Upscale,
  AdvertCards,
} from "../../components/components";

const Home = (props) => {
  return (
    <div className="home-container">
      <Navbar />
      <Upscale />
      <AdvertCards />
      <Features />
    </div>
  );
};

export default Home;
