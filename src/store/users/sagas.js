import { takeLatest, put, call } from "redux-saga/effects";

import { GET_USERS_POSTS, GET_USER_DETAILS, } from "./actionTypes";

import {
  getUserDetailsSuccess,
  getUserDetailsFail,
  getUsersPostsSuccess,
  getUsersPostsFail
} from "./actions";

import { getUserDetails, getUsersPosts } from "../../helpers/backend_helper";

function* onGetUserDetails({ payload: id }) {
  try {
    const response = yield call(getUserDetails, id);
    yield put(getUserDetailsSuccess(response));
  } catch (error) {
    yield put(getUserDetailsFail(error.response));
  }
}

function* onGetUsersPosts({ payload: id }) {
  try {
    const response = yield call(getUsersPosts, id);
    yield put(getUsersPostsSuccess(response));
  } catch (error) {
    yield put(getUsersPostsFail(error.response));
  }
}

function* UserSaga() {
  yield takeLatest(GET_USER_DETAILS, onGetUserDetails);
  yield takeLatest(GET_USERS_POSTS, onGetUsersPosts);
}

export default UserSaga;