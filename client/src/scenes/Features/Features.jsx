import React, { useState, useEffect } from "react";
import "./Features.css";
import { Navbar } from "../../components/components";
import { useParams } from "react-router-dom";
import { MdOutlineComputer } from "react-icons/md";
import { GiExpand } from "react-icons/gi";
import { BiTimer, BiSelectMultiple } from "react-icons/bi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { ImImages } from "react-icons/im";
const Features = (props) => {
  const [selectedFeature, setSelectedFeature] = useState(3);
  const { feature } = useParams();

  useEffect(() => {
    /* REDIRECT USER TO CORRECT FEATURE */
    setSelectedFeature(Number(feature));
  }, []);

  return (
    <div className="features-scene">
      <Navbar />

      <div className="features-scene-content">
        <div className="features-sidebar flex">
          <h1>Features</h1>

          <ul className="features-links flex">
            <li
              onClick={() => setSelectedFeature(1)}
              className={`feature-link flex ${
                selectedFeature === 1 ? "feature-active" : ""
              }`}
            >
              {" "}
              <MdOutlineComputer />
              <p>Real-ESRGAN</p>
            </li>
            <li
              onClick={() => setSelectedFeature(2)}
              className={`feature-link flex ${
                selectedFeature === 2 ? "feature-active" : ""
              }`}
            >
              {" "}
              <GiExpand />
              <p>Enhanced / Enlarged</p>
            </li>
            <li
              onClick={() => setSelectedFeature(3)}
              className={`feature-link flex ${
                selectedFeature === 3 ? "feature-active" : ""
              }`}
            >
              {" "}
              <BiTimer />
              <p>Efficiency</p>
            </li>
            <li
              onClick={() => setSelectedFeature(4)}
              className={`feature-link flex ${
                selectedFeature === 4 ? "feature-active" : ""
              }`}
            >
              {" "}
              <ImImages />
              <p>Output</p>
            </li>
            <li
              onClick={() => setSelectedFeature(5)}
              className={`feature-link flex ${
                selectedFeature === 5 ? "feature-active" : ""
              }`}
            >
              {" "}
              <HiOutlinePaintBrush />
              <p>Detail Refinement</p>
            </li>
            <li
              onClick={() => setSelectedFeature(6)}
              className={`feature-link flex ${
                selectedFeature === 6 ? "feature-active" : ""
              }`}
            >
              {" "}
              <BiSelectMultiple />
              <p>Compatability</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
