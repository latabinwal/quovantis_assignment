import {
	REQUEST_USER_LIST,
	REQUEST_USER_LIST_SUCCESS,
	REQUEST_USER_LIST_FAIL,
	REQUEST_SINGLE_USER_DATA,
	REQUEST_SINGLE_USER_DATA_SUCCESS,
	REQUEST_SINGLE_USER_DATA_FAIL
} from "../actions/profile";

const ACTION_HANDLERS = {
	[REQUEST_USER_LIST] : state => ({
		...state,
		userList: [],
		userListRequest: true
	}),
	[REQUEST_USER_LIST_SUCCESS] : (state,action) => ({
		...state,
		userList: action.payload,
		userListRequest: false
	}),
	[REQUEST_USER_LIST_FAIL] : (state) => ({
		...state,
		userList: [],
		userListRequest: true
	}),

	[REQUEST_SINGLE_USER_DATA] : state => ({
		...state,
		singleUserData: [],
		singleUserRequest: true
	}),
	[REQUEST_SINGLE_USER_DATA_SUCCESS] : (state,action) => ({
		...state,
		singleUserData: action.payload,
		singleUserRequest: false
	}),
	[REQUEST_SINGLE_USER_DATA_FAIL] : (state) => ({
		...state,
		singleUserData: [],
		singleUserRequest: true
	}),
};

const initialState = {
	userList: [],
	singleUserData: []
};

export default function profileReducer(state= initialState, action = {}) {
	const handler = ACTION_HANDLERS[action.type];
	return handler ? handler(state, action) : state;
}