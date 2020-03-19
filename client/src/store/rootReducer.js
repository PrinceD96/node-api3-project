import { combineReducers } from "redux";
import userReducer from "./users/userReducer";
import postReducer from "./posts/postReducer";

const rootReducer = combineReducers({ userReducer, postReducer });

export default rootReducer;
