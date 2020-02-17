import { put, takeLatest, call } from "redux-saga/effects";
import { REQUEST_LOGIN_USER, requestLoginUserSuccess, requestLoginUserError } from "../actions/login";
import { loginUserApi } from "../../services/api";

function * fetchLoginDataAsync (action) {
	const { data } = action;
	try{
		const response = yield call(loginUserApi, data);
		yield put(requestLoginUserSuccess(response))
	}
	catch (e) {
		yield put(requestLoginUserError(e));
	}
}

// watch function
function * loginSaga () {
	yield takeLatest(REQUEST_LOGIN_USER, fetchLoginDataAsync);
}

export default loginSaga;
