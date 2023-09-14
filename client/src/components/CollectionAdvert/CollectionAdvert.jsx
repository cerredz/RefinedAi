import React from "react";
import "./CollectionAdvert.css";
import { spanNames } from "./data";
import { useNavigate } from "react-router-dom";
const CollectionAdvert = (props) => {
  const navigate = useNavigate();
  return (
    <div className="collection-advert-container">
      {spanNames.map((span, index) => (
        <span key={index} className={span.classname}></span>
      ))}

      {/* COLLECTION ADVERT CONTENT */}
      <div className="collection-advert-content flex">
        <div className="content-text">
          {/* TEXT / BUTTONS*/}
          <h1 className="header">Discover Our Users Upscaled Images</h1>
          <p className="grey-text">
            Want to view our vibrant community's Upscaled Image Gallery? Click
            below to discover, download, share, and be inspired by our
            collection of incredible high-resolution images.
          </p>

          <div className="btn-container flex">
            <button
              onClick={() => navigate("/collection")}
              className="btn-collection smooth-btn"
            >
              View Collection
            </button>
            <button className="btn-user-images smooth-btn">
              View Your Images
              <span className="top top-right"></span>
              <span className="top top-top"></span>
              <span className="top-glow"></span>
              <span className="bottom bottom-bottom"></span>
              <span className="bottom bottom-left"></span>
              <span className="bottom-glow"></span>
            </button>
          </div>
        </div>

        {/* IMAGE */}
        <div className="content-image">
          <span className="card-glow"></span>
          <span className="image-glow"></span>
        </div>
      </div>
    </div>
  );
};

export default CollectionAdvert;
