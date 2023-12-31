import React, { useState, useEffect } from "react";
import "./Features.css";
import { Navbar } from "../../components/components";
import { useParams } from "react-router-dom";
import { MdOutlineComputer } from "react-icons/md";
import { GiExpand } from "react-icons/gi";
import { BiTimer, BiSelectMultiple } from "react-icons/bi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { ImImages } from "react-icons/im";
import { Esrgan, OutputFeature } from "../../components/components";
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

        {/* FEATURES */}
        <div className="features">
          {/* REAL-ESRGAN MODEL FEATURE */}
          {selectedFeature === 1 && <Esrgan />}

          {/* ENHANCE / ENLARGE FEATURE*/}
          {selectedFeature === 2 && (
            <>
              <h1 className="feature-title">Enhanced AND Enlarged</h1>
              <h3 className="feature-subheader">
                Does RefinedAI Enlarge My Image?{" "}
              </h3>
              <p className="feature-text">
                RefinedAI goes far beyond mere image enlargement, setting it
                apart from conventional upscaling techniques. While traditional
                methods simply increase the size of an image, often resulting in
                a blurry or pixelated appearance, Real-ESRGAN takes a more
                sophisticated approach. This advanced technology doesn't just
                magnify the image; it also enhances the individual pixels
                themselves, effectively breathing new life into each element
                within the image. By intelligently inferring and filling in
                missing details through a deep neural network, Real-ESRGAN
                significantly improves the clarity and sharpness of the image,
                ensuring that the upscaled version doesn't just look larger but
                also boasts a remarkable level of visual fidelity. This capacity
                to elevate image quality and preserve intricate details makes
                Real-ESRGAN an indispensable tool for tasks that demand both
                scale and clarity, such as high-quality image enlargement and
                restoration of old or low-resolution photographs.
              </p>
            </>
          )}

          {/* EFFICIENTCY FEATURE */}
          {selectedFeature === 3 && (
            <>
              <h1 className="feature-title">Efficient Upscaling</h1>
              <h3 className="feature-subheader">
                How Long Does it Take For My Image to Upscale?
              </h3>
              <p className="feature-text">
                Apart of providing customers with the best possible experience
                is being able to provide them with a fast and efficient solution
                to their problem. That is exactly what we provide at RefinedAI,
                as the upscaling process is both simple and easy to follow along
                with taking mere seconds to complete. Our goal is provide our
                customers with the best looking images possible while taking the
                least amount of time necessary to achieve this, and that is
                exactly what we are doing.
              </p>
            </>
          )}

          {/* 4k RESOLUTION OUTPUT FEATURE */}
          {selectedFeature === 4 && (
            <>
              <OutputFeature />
            </>
          )}

          {/* DETAIL REFINEMENT FEATURE */}
          {selectedFeature === 5 && (
            <>
              <h1 className="feature-title">Detail Refinement</h1>
              <h3 className="feature-subheader">
                How Does My Image Get Enhanced?
              </h3>
              <p className="feature-text">
                RefinedAI utilized a Real-ESRGAN model that focuses on enhancing
                the quality of individual pixels within an image, rather than
                solely enlarging it.It accomplishes this by analyzing the
                contextual information of neighboring pixels and using it to
                generate missing high-frequency details, resulting in remarkably
                clear and sharp images. Unlike traditional upscaling,
                Real-ESRGAN doesn't just stretch pixels; it reconstructs and
                refines them, producing images that maintain an authentic and
                natural appearance even when scaled up. This groundbreaking
                approach makes Real-ESRGAN invaluable for tasks where pixel
                quality and intricate details matter, such as improving the
                resolution of photos, restoring old images, and enhancing visual
                content across a wide range of applications. With this type of
                technology you can replace bluriness with crystal clearness.
              </p>
            </>
          )}

          {/* COMPATIBILITY FEATURE */}
          {selectedFeature === 6 && (
            <>
              <h1 className="feature-title">Compatibility</h1>
              <h3 className="feature-subheader">
                What File Types Does RefinedAi Accept?
              </h3>
              <p className="feature-text">
                The type of images that can be inputted into the RefinedAI image
                upscaler include the following: <br />
                .png, .jpg, .jpeg, .gif, .webp
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Features;
