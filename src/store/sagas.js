import { all, fork } from "redux-saga/effects";

import PostSaga from "./posts/saga";
import UserSaga from "./users/sagas";

export default function* rootSaga() {
  yield fork(PostSaga);
  yield fork(UserSaga);

}