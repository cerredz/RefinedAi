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
    usernamesSet.add(review.username);
    uniqueReviews.push(review);
  }
});

console.log(allReviews);
const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
  reviews: uniqueReviews,
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
  },
});

export const { setLogin, setLogout, setReviews } = authSlice.actions;
export default authSlice.reducer;
