/* HELPER FUNCTION FILE */
/* FUNCTIONS THAT ARE USED IN MULTIPLE FILES */
import Axios from "axios";
import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setJoinEmailList, setLeaveEmailList } from "./state";

/* DOWNLOADS THE INPUTTED IMAGE */
export const downloadImage = async (img) => {
  try {
    const imageUrl = `${process.env.REACT_APP_BACKEND_URL}/upscale/public/assets/upscaled/${img.picturePath}`;
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

/* GETS TOTAL USERS, TOTAL IMAGES UPSCALED, TOTAL 5 STAR REVIEWS, AND TOTAL REVIEWS */
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
      totalReviews: response.totalReviews,
    };

    return formattedAllStats;
  } catch (err) {
    console.log(err);
  }
};

/* SCROLLS TO THE OF PAGE, MAINLY USED ON SCENES WHEN USER IS REDIRECTED */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

/* GETS BEST QUALITY UPSCALED IMAGES FROM THE BACKEND */
export const getUpscaledImages = async () => {
  try {
    const response = await Axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/upscale/getUpscaledImages`
    );

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

/* CHECK IF USER HAS JOINED EMAIL LIST */
export const checkEmaiList = async (user, dispatch) => {
  const joinedEmailList = await Axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/emails/checkUser`,
    user
  );

  const response = joinedEmailList.data;

  if (response) {
    dispatch(setJoinEmailList());
  } else {
    dispatch(setLeaveEmailList());
  }
};

/* ADDS A USER'S EMAIL TO THE EMAIL LIST*/
export const handleJoinEmailList = async (user, dispatch, navigate) => {
  if (!user) return navigate("/login");

  const joinEmailList = await Axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/emails/join`,
    user
  );

  const response = joinEmailList.data;

  if (response) {
    dispatch(setJoinEmailList());
  }
};

/* REMOVES A USER'S EMAIL FROM THE EMAIL LIST */
export const handleLeaveEmailList = async (user, dispatch) => {
  const leaveEmailList = await Axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/emails/leave`,
    user
  );

  const response = leaveEmailList.data;

  if (response.res) {
    dispatch(setLeaveEmailList());
  }
};
