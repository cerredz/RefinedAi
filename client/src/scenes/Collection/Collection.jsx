import React, { useState, useEffect } from "react";
import "./Collection.css";
import { scrollToTop } from "../../client";
import { Navbar } from "../../components/components";
import { getUpscaledImages } from "../../client";
import { downloadImage } from "../../client";

const Collection = (props) => {
  const [collection, setCollection] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    scrollToTop();

    async function fetchImages() {
      try {
        const images = await getUpscaledImages();
        setCollection(images.frontendFormat);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }

    fetchImages();
  }, []);

  return (
    <div className="collection-container">
      <Navbar />
      <div className="collection-content">
        {/* TOP BANNER */}
        <div data-aos="zoom-in" className="collection-banner flex">
          <span className="header">Collection</span>
          <p className="grey-text">
            Immerse yourself in a curated selection of the most exquisite images
            all upscaled using RefinedAi. Feel free to download, share, or
            replicate anything you see below.
          </p>
        </div>

        <div className="collection-images flex">
          {/* UPSCALED IMAGES */}
          {collection &&
            collection.map((image, index) => (
              <div
                data-aos="fade-up"
                date-aos-offset="300"
                onMouseOver={() => setSelectedImage(index)}
                onMouseLeave={() => setSelectedImage(null)}
                key={index}
                className="image-container"
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_IMAGE_STORAGE}/${image.picturePath}`}
                  alt=""
                />

                {/* CARD THAT POPS UP WHEN USER HOVERS IMAGE */}
                {selectedImage === index ? (
                  <div data-aos="fade-up" className="selected-image flex">
                    <div className="info flex">
                      <div className="user-info flex">
                        <img src={image.userProfilePicture} alt="" />
                        <p className="grey-text">{image.username}</p>
                      </div>

                      <div className="user-info">
                        <p className="grey-text">
                          {image.width}x{image.height}
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => downloadImage(image)}
                      className="download-container flex"
                    >
                      <button className="download">Download</button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
