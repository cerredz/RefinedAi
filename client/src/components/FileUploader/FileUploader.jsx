import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineCloudUpload,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import Dropzone from "react-dropzone";
import "./FileUploader.css";
/*
const FileUploader = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      console.log(user);
    }, 2000);
  }, []);
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();
      formData.append("picture", acceptedFiles[0]);

      if (user) {
        console.log(JSON.stringify(user));
        console.log(JSON.stringify(user._id));
        formData.append("_id", user._id);
        console.log(formData);
        try {
          const response = await Axios.post(
            "http://localhost:3001/upscale/image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("File uploaded successfully:", response.data);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } else {
        //user not signed in
        navigate("/login");
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".pdf,.jpg,.jpeg",
  });

  return (
    <div>
      <div {...getRootProps()} className="file-dropzone flex">
        <input {...getInputProps()} />
        <button className="btn-upload flex">
          <p>Upload</p>
          <AiOutlineCloudUpload />
        </button>
      </div>
    </div>
  );
};

*/

const FileUploader = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
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
    formData.append("userString", user);

    /* Update Frontend Display */
    setUpscalingImage(true);
    setImage(null);

    const response = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/upscale/image`,
      formData
    );

    const userData = await response.data.user;
    const imageData = await response.data.image;

    setUpscalingImage(false);

    /* Extract The Upscaled Image from the backend */
    setUpscaledImage(
      `${process.env.REACT_APP_BACKEND_IMAGE_STORAGE}/${imageData}`
    );

    /* Update User's Credits and Image Paths*/
    localStorage.setItem("user", JSON.stringify(userData));
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
        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
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
                  <img
                    className="dropzone-image"
                    src={upscaledImage}
                    alt="upscaled"
                  />
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
    </div>
  );
};

export default FileUploader;
