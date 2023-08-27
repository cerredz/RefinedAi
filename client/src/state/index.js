import { createSlice } from "@reduxjs/toolkit";
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
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  reviews: uniqueReviews,
  images: [],
  emailList: false,
  creditID: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
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
  },
});

export const {
  setLogin,
  setLogout,
  setReviews,
  setImages,
  setJoinEmailList,
  setLeaveEmailList,
  setCreditID,
  setEraseCreditId,
} = authSlice.actions;
export default authSlice.reducer;
