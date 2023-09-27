import React, { useEffect } from "react";
import { anchorTags } from "./data";
import "./AnchorTag.css";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../client";
const AnchorTags = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    scrollToTop();
  }, []);
  return (
    <div className="anchor-container">
      <h1>Image Credits</h1>
      {/* ANCHOR TAGS */}
      <ul className="flex">
        {anchorTags.map((anchorTag, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: anchorTag }} />
        ))}
      </ul>

      {/* BACK BUTTON */}
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default AnchorTags;
