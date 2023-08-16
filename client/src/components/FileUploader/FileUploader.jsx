import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineCloudUpload } from "react-icons/ai";
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
  const [image, setImage] = useState(null);

  const handleUpscale = async () => {
    console.log(image);
    const formData = new FormData();
    formData.append("picture", image);
    formData.append("userString", user);
    /*
    const response = await Axios.post(`http://localhost:3001/upscale/image`, {
      user: JSON.parse(user),
      picture: image,
    });
    */

    const response = await fetch(`http://localhost:3001/upscale/image`, {
      method: "POST",
      body: formData,
    });

    setImage(null);
  };
  return (
    <>
      {image && <button onClick={handleUpscale}>Upscale</button>}
      <Dropzone
        acceptedFiles=".jpg, .jpeg, .png"
        multiple={false}
        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input {...getInputProps()}></input>
            {!image ? <p>Upload</p> : <div>{image.name}</div>}
          </div>
        )}
      </Dropzone>
    </>
  );
};

export default FileUploader;
