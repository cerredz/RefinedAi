import React, { useEffect, useState } from "react";
import "./AccountImages.css";
import { useSelector, useDispatch } from "react-redux/";
import { setImages } from "../../state";
import { BiExpand } from "react-icons/bi";
import { BsDownload } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Axios from "axios";
import copyrightIcon from "../assets/copyright.png";
import upscaleIcon from "../assets/check.png";
import downloadIcon from "../assets/download.png";
import { saveAs } from "file-saver";
import { downloadImage } from "../../client";
import { SmoothDarkButton } from "../../widgets/widgets";

const AccountImages = () => {
  const user = useSelector((state) => state.auth.user);
  const images = useSelector((state) => state.auth.images);
  const dispatch = useDispatch();

  const [isSelectedImage, setIsSelectedImage] = useState();
  const [imgSize, setImgSize] = useState(null);

  useEffect(() => {
    getUserImages();
  }, []);

  /* GET ALL IMAGES THER USER HAS UPSCALED */
  const getUserImages = async () => {
    const userImages = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/auth/retrieveImages`,
      {
        userID: user._id,
      }
    );

    const response = userImages.data;
    dispatch(setImages({ images: response }));
  };

  /* USER CLICKED AN IMAGE TO EXPAND */
  const handleImageClick = (img) => {
    setIsSelectedImage(img);

    const imgSize = img.size;
    const kiloBytes = Math.round(img.size / 1024);

    if (kiloBytes > 1000) {
      const megaBytes = (kiloBytes / 1024).toFixed(1);
      setImgSize(`${megaBytes} MB`);
    } else {
      setImgSize(`${kiloBytes} KB`);
    }
  };

  return (
    <>
      <div className="account-images-container">
        {/* IMAGES USER HAS UPSCALED */}
        {images &&
          images.map((img, index) => (
            <div
              onClick={() => handleImageClick(img)}
              className={`image-container flex `}
              key={index}
            >
              {/* SINGULAR IMAGE */}
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/upscale/public/assets/${img.picturePath}`}
                alt="user-upscaled"
              ></img>

              <div className="selected-container flex">
                <BiExpand />
              </div>
            </div>
          ))}
      </div>

      {isSelectedImage && (
        <div className="selected-upscaled-image-container">
          {/* EXPANDED IMAGE CONTAINER */}
          <div className="close-container flex">
            <AiOutlineClose onClick={() => setIsSelectedImage(null)} />
          </div>

          {/* IMAGE HEADER */}
          <div className="img-container flex">
            <img
              id="selected-image"
              src={`${process.env.REACT_APP_BACKEND_URL}/upscale/public/assets/${isSelectedImage.picturePath}`}
              alt="upscale"
            />

            <button
              onClick={() => downloadImage(isSelectedImage)}
              className="download flex"
            >
              {" "}
              <BsDownload />
              Download
            </button>
          </div>

          {/* DISCLAIMERS */}
          <div className="disclaimers-container">
            <div className="flex">
              <img src={upscaleIcon} alt="" />
              <p>Upscaled</p>
            </div>
            <div className="flex">
              <img src={downloadIcon} alt="" />
              <p>Free to Download</p>
            </div>
            <div className="flex">
              <img src={copyrightIcon} alt="" />
              <p>Copyright Free</p>
            </div>
          </div>
          {/* USER INFO */}
          <div className="user-container flex">
            <img className="pfp" src={user.picturePath} alt=""></img>
            <p>{user.username}</p>
          </div>

          {/* IMAGE INFO */}
          <div className="image-info-container flex">
            <div className="header-container flex">
              <h3 className="header">Image Stats</h3>
            </div>

            <div className="image-info-content flex">
              <div className="image-info ">
                <h3 className="subheader">{isSelectedImage.width}</h3>
                <p className="grey-text">Width</p>
              </div>

              <div className="image-info ">
                <h3 className="subheader">{isSelectedImage.height}</h3>
                <p className="grey-text">Height</p>
              </div>

              <div className="image-info ">
                <h3 className="subheader">{imgSize}</h3>
                <p className="grey-text">Size</p>
              </div>

              <div className="image-info ">
                <h3 className="subheader">{isSelectedImage.aspectRatio}</h3>
                <p className="grey-text">Aspect Ratio</p>
              </div>

              <div className="image-info ">
                <h3 className="subheader">{isSelectedImage.format}</h3>
                <p className="grey-text">File Type</p>
              </div>
            </div>
          </div>

          <SmoothDarkButton
            handleClick={() => setIsSelectedImage(null)}
            text={"Back"}
          />
        </div>
      )}
    </>
  );
};

export default AccountImages;
