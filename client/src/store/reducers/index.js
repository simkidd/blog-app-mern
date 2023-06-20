import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import commentReducer from "./commentSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  users: userReducer,
  posts: postReducer,
  comments: commentReducer,
});

export default rootReducer;
