import {
  GET_USER_DETAILS,
  GET_USER_DETAILS_SUCCESS,
  GET_USER_DETAILS_FAIL,
  GET_USERS_POSTS,
  GET_USERS_POSTS_SUCCESS,
  GET_USERS_POSTS_FAIL,
} from "./actionTypes";

export const getUserDetails = (id) => {
  return {
    type: GET_USER_DETAILS,
    payload: id,
  };
};

export const getUserDetailsSuccess = (user) => {
  return {
    type: GET_USER_DETAILS_SUCCESS,
    payload: user,
  };
};

export const getUserDetailsFail = (error) => {
  return {
    type: GET_USER_DETAILS_FAIL,
    payload: error,
  };
};

export const getUsersPosts = (id) => {
  return {
    type: GET_USERS_POSTS,
    payload: id,
  };
};

export const getUsersPostsSuccess = (posts) => {
  return {
    type: GET_USERS_POSTS_SUCCESS,
    payload: posts,
  };
};

export const getUsersPostsFail = (error) => {
  return {
    type: GET_USERS_POSTS_FAIL,
    payload: error,
  };
};
