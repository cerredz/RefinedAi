import React from "react";
import { text } from "./data";
const OutputFeature = (props) => {
  return (
    <div>
      <h1 className="feature-title">4k Resolution Output</h1>
      {text.map((t, index) => (
        <>
          <h3 className="feature-subheader">{t.heading}</h3>
          <p className="feature-text">{t.subheading}</p>
        </>
      ))}
    </div>
  );
};

export default OutputFeature;
