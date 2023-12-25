import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authentications/authSlice.jsx";
import postReducer from "./features/posts/postSlice.jsx";

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

export default store;
