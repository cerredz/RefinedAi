import { createSlice } from "@reduxjs/toolkit";
import { getStats } from "../client";
import Axios from "axios";

/* GET REVIEWS FROM BACKEND */
const allReviews = await Axios.get(
  `${process.env.REACT_APP_BACKEND_URL}/reviews/getReviews`
);

/* ONLY WANT 1 REVIEW PER USER*/
const uniqueReviews = [];
const usernamesSet = new Set();

allReviews.data.forEach((review) => {
  if (!usernamesSet.has(review.username)) {
    const wordArray = review.description.split(/\s+/);
    const wordCount = wordArray.length;

    if (wordCount < 50) {
      usernamesSet.add(review.username);
      uniqueReviews.push(review);
    }
  }
});

let existedUser = null;
/* SEE IF USER EXISTS */
if (localStorage.getItem("user")) {
  existedUser = JSON.parse(localStorage.getItem("user"));

  // the reason we are making a call to the backend to get the user instead of just the localStorage is
  // beacuse when the user buys credits we do not update the localStorage, so their credits will
  // never update if we just get the user from the localStorage, which is why we get it from our backend
  const updateUser = Axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/auth/getUser`,
    {
      params: {
        userID: existedUser._id,
      },
    }
  )
    .then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data));
    })
    .then(() => {
      existedUser = JSON.parse(localStorage.getItem("user"));
    })
    .catch((err) => {
      console.log(err);
    });
}

/* GET TOTAL USERS, TOTAL IMAGES UPSCALED, AND TOTAL 5 STAR REVIEWS FROM THE BACKEND */
const allStats = await getStats();

const initialState = {
  user: existedUser,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  reviews: uniqueReviews,
  images: [],
  emailList: false,
  creditID: null,
  stats: allStats,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUpdateUser: (state, action) => {
      state.user = action.payload.user;
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
    },

    setReviews: (state, action) => {
      state.reviews = action.payload.reviews;
    },

    setImages: (state, action) => {
      state.images = action.payload.images;
    },

    setJoinEmailList: (state, action) => {
      state.emailList = true;
    },
    setLeaveEmailList: (state, action) => {
      state.emailList = false;
    },

    setCreditID: (state, action) => {
      state.creditID = action.payload.creditID;
    },

    setEraseCreditId: (state, action) => {
      state.creditID = null;
    },

    setTotalUsers: (state, action) => {
      state.stats.totalUsers = action.payload.totalUsers;
    },

    setTotalImagesUpscaled: (state, action) => {
      state.stats.totalImagesUpscaled = action.payload.totalImagesUpscaled;
    },

    setTotalFiveStarReviews: (state, action) => {
      state.stats.totalFiveStarReviews = action.payload.totalFiveStarReviews;
    },
  },
});

export const {
  setUpdateUser,
  setLogin,
  setLogout,
  setReviews,
  setImages,
  setJoinEmailList,
  setLeaveEmailList,
  setCreditID,
  setEraseCreditId,
  setTotalUsers,
  setTotalImagesUpscaled,
  setTotalFiveStarReviews,
} = authSlice.actions;
export default authSlice.reducer;
