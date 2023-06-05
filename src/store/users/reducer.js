import { GET_USERS_POSTS, GET_USERS_POSTS_FAIL, GET_USERS_POSTS_SUCCESS, GET_USER_DETAILS, GET_USER_DETAILS_FAIL, GET_USER_DETAILS_SUCCESS } from "./actionTypes";

const initialState = {
  user: {},
  posts: [],
  loadingUserDetails: false,
  loadingUsersPosts: false,
  error: {
    message: "",
  },
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_DETAILS:
      state = { ...state, loadingUserDetails: true };
      break;
    case GET_USER_DETAILS_SUCCESS:
      state = { ...state, user: action.payload[0], loadingUserDetails: false };
      break;
    case GET_USER_DETAILS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingUserDetails: false,
      };
      break;
    case GET_USERS_POSTS:
      state = { ...state, loadingUsersPosts: true };
      break;
    case GET_USERS_POSTS_SUCCESS:
      state = { ...state, posts: action.payload, loadingUsersPosts: false };
      break;
    case GET_USERS_POSTS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingUserDetails: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default UserReducer;