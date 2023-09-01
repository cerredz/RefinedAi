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
    console.log("Image Successfully Downloaded!! ");
  } catch (error) {
    console.error("Error fetching or downloading image:", error);
  }
};

/* GET ALL PRICE DATA FROM THE BACKEND */
export const getAllPriceData = async () => {
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

/* GET SINGULAR PRICE OBJECT DATA FROM THE BACKEND */
export const getPurchaseData = async (id) => {
  try {
    const getPrice = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/credits/getPrice`,
      {
        params: {
          _id: id,
        },
      }
    );

    const response = getPrice.data;
    return response;
  } catch (err) {
    console.log(err);
  }
};

/* GET ALL REVIEWS WRITTEN BY A USER */
export const getUserReviews = async (id) => {
  try {
    const userReviews = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/auth/getUserReviews`,
      { params: { id: id } }
    );

    return userReviews.data;
  } catch (err) {
    console.log(err);
  }
};

/* GETS TOTAL USERS, TOTAL IMAGES UPSCALED, AND TOTAL 5 STAR REVIEWS */
export const getStats = async () => {
  try {
    let formattedAllStats = null;
    const allStats = await Axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/auth/allStats`
    );
    const response = allStats.data;

    formattedAllStats = {
      totalUsers: response.totalUsers,
      totalImagesUpscaled: response.totalImagesUpscaled,
      totalFiveStarReviews: response.totalFiveStarReviews,
    };

    return formattedAllStats;
  } catch (err) {
    console.log(err);
  }
};
