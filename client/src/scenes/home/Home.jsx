import React, { useEffect } from "react";
import {
  Features,
  Upscale,
  CreditsAdvert,
  CollectionAdvert,
  ReviewAdvert,
  EmailListAdvert,
  Footer,
} from "../../components/components";
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
        <CollectionAdvert />
        <Features />
        <ReviewAdvert />
        <EmailListAdvert />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
