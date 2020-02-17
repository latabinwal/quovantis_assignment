import { REQUEST_LOGIN_USER, REQUEST_LOGIN_USER_SUCCESS, REQUEST_LOGIN_USER_FAIL } from "../actions/login";

const ACTION_HANDLERS = {
	[REQUEST_LOGIN_USER] : state => ({
		...state,
		loginData: []
	}),
	[REQUEST_LOGIN_USER_SUCCESS] : (state,action) => ({
		...state,
		loginData: action.payload
	}),
	[REQUEST_LOGIN_USER_FAIL] : (state) => ({
		...state,
		loginData: []
	}),
};

const initialState = {
	loginData: []
};

export default function loginReducer(state= initialState, action = {}) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}