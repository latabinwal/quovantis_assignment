export const REQUEST_USER_LIST = "REQUEST_USER_LIST";
export const REQUEST_USER_LIST_SUCCESS = "REQUEST_USER_LIST_SUCCESS";
export const REQUEST_USER_LIST_FAIL = "REQUEST_USER_LIST_FAIL";

export const REQUEST_SINGLE_USER_DATA = "REQUEST_SINGLE_USER_DATA";
export const REQUEST_SINGLE_USER_DATA_SUCCESS = "REQUEST_SINGLE_USER_DATA_SUCCESS";
export const REQUEST_SINGLE_USER_DATA_FAIL = "REQUEST_SINGLE_USER_DATA_FAIL";

export const requestUserList = (page) => ({ type: REQUEST_USER_LIST, page });
export const requestUserListSuccess = data => ({ type: REQUEST_USER_LIST_SUCCESS, payload:data });
export const requestUserListError = (e) => ({ type: REQUEST_USER_LIST_SUCCESS, error: e });

export const requestSingleUserData = (userId) => ({ type: REQUEST_SINGLE_USER_DATA, userId });
export const requestSingleUserDataSuccess = data => ({ type: REQUEST_SINGLE_USER_DATA_SUCCESS, payload:data });
export const requestSingleUserDataError = (e) => ({ type: REQUEST_SINGLE_USER_DATA_SUCCESS, error: e });
