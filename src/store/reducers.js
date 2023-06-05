import { combineReducers } from "redux";

import PostReducer from "./posts/reducer";
import UserReducer from './users/reducer'

const rootReducer = combineReducers({
  PostReducer,
  UserReducer
});

export default rootReducer;