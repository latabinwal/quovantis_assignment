export const REQUEST_LOGIN_USER = "REQUEST_LOGIN_USER";
export const REQUEST_LOGIN_USER_SUCCESS = "REQUEST_LOGIN_USER_SUCCESS";
export const REQUEST_LOGIN_USER_FAIL = "REQUEST_LOGIN_USER_FAIL";

export const requestLoginUser = (data) => ({ type: REQUEST_LOGIN_USER, data });
export const requestLoginUserSuccess = data => ({ type: REQUEST_LOGIN_USER_SUCCESS, payload:data });
export const requestLoginUserError = (e) => ({ type: REQUEST_LOGIN_USER_FAIL, error: e });