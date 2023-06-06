import { takeLatest, put, call } from "redux-saga/effects";

import { GET_POSTS, GET_POST_DETAILS, GET_COMMENTS, SORT_POST, } from "./actionTypes";

import {
  getPostsSuccess,
  getPostsFail,
  getPostDetailsSuccess,
  getPostDetailsFail,
  getCommentsSuccess,
  getCommentsFail,
  sortPostSuccess,
  sortPostFail,
} from "./actions";

import { getPosts, getPostDetails, getComments, sortPost } from "../../helpers/backend_helper";

function* onGetPosts({ payload: { start, end, currentPage } }) {
  try {
    const response = yield call(getPosts, start, end);
    yield put(getPostsSuccess({ posts: response, currentPage }));
  } catch (error) {
    yield put(getPostsFail(error.response));
  }
}

function* onGetPostDetails({ payload: id }) {
  try {
    const response = yield call(getPostDetails, id);
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

function* onSortPost({ payload: { value, start, end } }) {
  try {
    const response = yield call(sortPost, value, start, end);
    yield put(sortPostSuccess(response));
  } catch (error) {
    yield put(sortPostFail(error.response));
  }
}

function* PostSaga() {
  yield takeLatest(GET_POSTS, onGetPosts);
  yield takeLatest(GET_POST_DETAILS, onGetPostDetails);
  yield takeLatest(GET_COMMENTS, onGetComments);
  yield takeLatest(SORT_POST, onSortPost);

}

export default PostSaga;