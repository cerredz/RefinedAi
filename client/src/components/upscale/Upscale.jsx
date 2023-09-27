import React, { useState, useEffect } from "react";
import FileUploader from "../FileUploader/FileUploader";
import "./Upscale.css";
import { Navbar } from "../components";
import { useSelector } from "react-redux";
import { cardData } from "./Cards";
import UpscaleParticles from "./UpscaleParticles";

const Upscale = (props) => {
  const stats = useSelector((state) => state.auth.stats);
  return (
    <div className="upscale-container">
      <Navbar />

      <UpscaleParticles />

      <div className="upscale-content">
        <div data-aos="fade-down" className="upscale-header flex">
          <h1 className="header">RefinedAI Upscaling</h1>
          <p className="grey-text subheader">
            Utilize World Class AI Upscaling to Create Ultra High Resolution
            Images
          </p>
        </div>

        <div data-aos="zoom-in" className="upscale-info flex">
          <div className="users-info stat flex">
            <h1 className="stat-text ">{stats.totalUsers}+</h1>
            <p className="grey-text">Satisfied Customers</p>
          </div>
          <div className="images-info stat flex">
            <h1 className="stat-text">{stats.totalImagesUpscaled}+</h1>
            <p className="grey-text">Images Upscaled</p>
          </div>
          <div className="reviews-info stat flex">
            <h1 className="stat-text ">{stats.totalFiveStarReviews}+</h1>
            <p className="grey-text">5 Star Reviews</p>
          </div>
        </div>

        <div data-aos="fade-up" className="upscale-uploader">
          <FileUploader />
        </div>

        <div data-aos="fade-up" className="upscale-cards-container flex">
          {cardData.map((card, index) => (
            <div className={`card-container ${card.classname}`} key={index}>
              <span className="top-right-top"></span>
              <span className="top-right-right"></span>
              <span className="bottom-left-left"></span>
              <span className="bottom-left-bottom"></span>
              <span className="glow-circle"></span>

              <div className="image-container">
                <img src={card.img} alt={card.classname} />
              </div>
              <div className="card-text">
                <h2 className="heading"> {card.heading}</h2>
                <p className="grey-text">{card.subheading}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upscale;
