import { takeLatest, put, call } from "redux-saga/effects";

import { GET_POSTS, GET_POST_DETAILS, GET_COMMENTS } from "./actionTypes";

import {
  getPostsSuccess,
  getPostsFail,
  getPostDetailsSuccess,
  getPostDetailsFail,
  getCommentsSuccess,
  getCommentsFail
} from "./actions";

import { getPosts, getPostDetails, getComments } from "../../helpers/backend_helper";

function* onGetPosts() {
  try {
    const response = yield call(getPosts);
    yield put(getPostsSuccess(response));
  } catch (error) {
    yield put(getPostsFail(error.response));
  }
}

function* onGetPostDetails({ payload: id }) {
  try {
    const response = yield call(getPostDetails, );
    yield put(getPostDetailsSuccess(response));
  } catch (error) {
    yield put(getPostDetailsFail(error.response));
  }
}

function* onGetComments({ payload: id }) {
  try {
    const response = yield call(getComments, id);
    yield put(getCommentsSuccess(response));
  } catch (error) {
    yield put(getCommentsFail(error.response));
  }
}

function* CartSaga() {
  yield takeLatest(GET_POSTS, onGetPosts);
  yield takeLatest(GET_POST_DETAILS, onGetPostDetails);
  yield takeLatest(GET_COMMENTS, onGetComments);
}

export default CartSaga;