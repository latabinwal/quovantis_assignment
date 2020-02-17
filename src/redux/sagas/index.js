import { all, fork } from "redux-saga/effects";
import loginSaga from "./loginSaga";
import profileSaga from "./profileSaga";

function* rootSaga() {
	yield all([
		fork(loginSaga),
		fork(profileSaga)
	]);
}
export default rootSaga;