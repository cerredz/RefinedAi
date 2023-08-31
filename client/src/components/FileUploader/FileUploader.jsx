import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import {
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import Dropzone from "react-dropzone";
import { downloadImage } from "../../client";
import "./FileUploader.css";

const FileUploader = (props) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);

  const [upscalingImage, setUpscalingImage] = useState(false);
  const [upscaledImage, setUpscaledImage] = useState(null);
  const [creditsError, setCreditsError] = useState(false);

  // Function to Upscale an Image for a User
  const handleUpscale = async () => {
    if (user.credits < 1) {
      //user does not have enought credits
      setCreditsError(true);
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

    const response = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/upscale/image`,
      formData
    );

    const userData = response.data.user;
    const imageData = response.data.imageObj;

    setUpscalingImage(false);

    /* Extract The Upscaled Image from the backend */
    setUpscaledImage(imageData);

    dispatch(setLogin({ user: userData, token: token }));
    /* Update User's Credits and Image Paths*/
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleOnDrop = (acceptedFiles) => {
    setImage(acceptedFiles[0]);
    props.handleUploadImage();
    setUpscaledImage(false);
  };

  return (
    <div className="file-uploader-container flex">
      {/* After Image is Uploaded */}
      {image && (
        <button className="upscale" onClick={handleUpscale}>
          Upscale
        </button>
      )}
      {creditsError && (
        <p className="err-credits">* Error: Not Enough Credits *</p>
      )}
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
                      src={`${process.env.REACT_APP_BACKEND_URL}/upscale/Public/assets/${upscaledImage.picturePath}`}
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
