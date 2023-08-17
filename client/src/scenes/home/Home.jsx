import React from "react";
import {
  Navbar,
  Upscale,
  UpscalerFacts,
  AdvertCards,
} from "../../components/components";

const Home = (props) => {
  return (
    <div className="home-container">
      <Navbar />
      <Upscale />
      <AdvertCards />
      <UpscalerFacts />
    </div>
  );
};

export default Home;
