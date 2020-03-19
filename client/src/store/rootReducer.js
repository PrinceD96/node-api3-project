import { combineReducers } from "redux";
import userReducer from "./users/userReducer";
import postReducer from "./posts/postReducer";

const rootReducer = combineReducers({
	users: userReducer,
	posts: postReducer
});

export default rootReducer;
