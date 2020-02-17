import { put, takeLatest, call } from "redux-saga/effects";
import { userListApi, singleUserApi } from "../../services/api";
import {
	REQUEST_USER_LIST,
	requestUserListSuccess,
	requestUserListError,
	REQUEST_SINGLE_USER_DATA,
	requestSingleUserDataSuccess,
	requestSingleUserDataError
} from "../actions/profile";

function * fetchProfileDataAsync (action) {
	const { page } = action;
	try{
		const response = yield call(userListApi, page);
		yield put(requestUserListSuccess(response))
	}
	catch (e) {
		yield put(requestUserListError(e));
	}
}

function * fetchsingleUserProfileAsync (action) {
	const { userId } = action;
	try{
		const response = yield call(singleUserApi, userId);
		yield put(requestSingleUserDataSuccess(response))
	}
	catch (e) {
		yield put(requestSingleUserDataError(e));
	}
}

// watch function
function * profileSaga () {
	yield takeLatest(REQUEST_USER_LIST, fetchProfileDataAsync);
	yield takeLatest(REQUEST_SINGLE_USER_DATA, fetchsingleUserProfileAsync);
}

export default profileSaga;