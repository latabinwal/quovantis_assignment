import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import loginReducer from "./login";
import profileReducer from "./profile";

export default combineReducers ({
	login: loginReducer,
	profile: profileReducer,
	form
});