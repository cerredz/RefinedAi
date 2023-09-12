import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUpdateUser } from "../../state";
import {
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import Dropzone from "react-dropzone";
import { downloadImage } from "../../client";
import "./FileUploader.css";

const FileUploader = (props) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);

  const [upscalingImage, setUpscalingImage] = useState(false);
  const [upscaledImage, setUpscaledImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    console.log(image);
  }, [image]);
  // Function to Upscale an Image for a User
  const handleUpscale = async () => {
    if (user.credits < 1) {
      //user does not have enought credits
      navigate("/credits");
      return;
    }

    if (!user) {
      //user is not logged in
      navigate("/login");
      return;
    }

    /* Pass Picture and User Information to Backend*/
    const formData = new FormData();
    formData.append("picture", image);
    formData.append("userString", JSON.stringify(user));

    /* Update Frontend Display */
    setUpscalingImage(true);
    setImage(null);

    const request = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/upscale/image`,
      formData
    );

    const response = request.data;

    if (response.message === "Image Input Too Big") {
      setErrors({ upscale: true });
      return;
    }

    /* IMAGE UPSCALED, UPDATE FRONTEND */
    const userData = response.user;
    const imageData = response.imageObj;

    setUpscalingImage(false);
    setUpscaledImage(imageData);

    dispatch(setUpdateUser({ user: userData }));
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /* UPDATE IMAGE AND IMAGE HIEGHT WHEN USER UPLOADS IMAGE */
  const handleOnDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    setUpscaledImage(false);
  };

  return (
    <div className="file-uploader-container flex">
      {/* After Image is Uploaded */}
      {image && (
        <>
          <button className="upscale" onClick={handleUpscale}>
            Upscale
          </button>
          <GrClose className="cancel" onClick={() => setImage(null)} />
        </>
      )}
      {errors.upscale && <p>Input Image Too Big</p>}

      <Dropzone
        acceptedFiles=".jpg, .jpeg, .png"
        multiple={false}
        onDrop={(acceptedFiles) => handleOnDrop(acceptedFiles)}
      >
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone-container" {...getRootProps()}>
            <input {...getInputProps()}></input>
            {!image ? (
              <>
                {/* Before Any Image Is Uploaded */}
                {!upscalingImage && !upscaledImage ? (
                  <button className="upload flex">
                    Upload <AiOutlineCloudUpload />
                  </button>
                ) : (
                  <>
                    {/* Loading Screen While Image is Upscaling */}
                    {upscalingImage && (
                      <AiOutlineLoading3Quarters className="loading" />
                    )}
                  </>
                )}

                {/* Image After Upscaling */}
                {upscaledImage && (
                  <div
                    className="flex"
                    style={{ flexDirection: `column`, gap: `10px` }}
                  >
                    <img
                      className="dropzone-image"
                      src={`${process.env.REACT_APP_BACKEND_URL}/upscale/Public/assets/upscaled/${upscaledImage.picturePath}`}
                      alt="upscaled"
                    />
                  </div>
                )}
              </>
            ) : (
              <div>
                {!upscaledImage ? (
                  <img
                    className="dropzone-image"
                    src={URL.createObjectURL(image)}
                    alt="Uploaded"
                  />
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
        )}
      </Dropzone>

      {!image && upscaledImage && (
        <button
          className="download"
          onClick={() => downloadImage(upscaledImage)}
        >
          Download
        </button>
      )}
    </div>
  );
};

export default FileUploader;
