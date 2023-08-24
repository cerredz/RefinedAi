/* HELPER FUNCTION FILE */
/* FUNCTIONS THAT ARE USED IN MULTIPLE FILES */
import Axios from "axios";
import { saveAs } from "file-saver";

/* DOWNLOADS THE INPUTTED IMAGE */
export const downloadImage = async (img) => {
  try {
    const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/upscale/public/assets/${img.picturePath}`;
    const response = await Axios.get(imageUrl, {
      responseType: "arraybuffer",
    });

    const blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });

    saveAs(blob, img.picturePath);
  } catch (error) {
    console.error("Error fetching or downloading image:", error);
  }
};

/* GET PRICE DATA FROM THE BACKEND */
export const getPriceData = async () => {
  try {
    const priceData = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/credits/getAllPrices`
    );
    const response = priceData.data;
    return response;
  } catch (err) {
    console.log(err);
  }
};
