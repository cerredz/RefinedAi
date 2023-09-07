import React, { useEffect } from "react";
import { Navbar, Credits } from "../../components/components";
import { HomepageReturn } from "../../widgets/widgets";

import "./CreditsExplore.css";

const CreditsExplore = (props) => {
  useEffect(() => {}, []);

  return (
    <>
      <Navbar />
      <div className="credits-explore-container">
        {/* CUSTOM GLOWING CIRCLES */}
        <span className="glow small small-left"></span>
        <span className="glow small small-medium"></span>
        <span className="glow small small-right"></span>
        <span className="glow medium medium-left"></span>
        <span className="glow medium medium-medium"></span>
        <span className="glow medium medium-right"></span>
        <span className="glow big big-left"></span>
        <span className="glow big big-medium"></span>
        <span className="glow big big-right"></span>
        <>
          <div className="credits-explore-banner">
            <h1 className="header">
              Choose Your <span className="glow-text">Credit</span> Package
            </h1>
            <p className="grey-text">
              Credits are used for upscaling images, everytime you upscale an
              image 1 credit is subtracted from your account credit
            </p>
          </div>
          <Credits />
        </>

        <HomepageReturn />
      </div>
    </>
  );
};

export default CreditsExplore;
