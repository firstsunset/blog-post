import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAIL,
  GET_COMMENTS,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  GET_CURRENT_PAGE,
  SORT_POST,
  SORT_POST_SUCCESS,
  SORT_POST_FAIL,
} from "./actionTypes";

export const getPosts = (pageInfo) => {
  return {
    type: GET_POSTS,
    payload: pageInfo
  };
};

export const getPostsSuccess = (posts) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: posts,
  };
};

export const getPostsFail = (error) => {
  return {
    type: GET_POSTS_FAIL,
    payload: error,
  };
};

export const getCurrentPage = (page) => {
  return {
    type: GET_CURRENT_PAGE,
    payload: page,
  };
};

export const getPostDetails = (id) => {
  return {
    type: GET_POST_DETAILS,
    payload: id,
  };
};

export const getPostDetailsSuccess = (post) => {
  return {
    type: GET_POST_DETAILS_SUCCESS,
    payload: post,
  };
};

export const getPostDetailsFail = (error) => {
  return {
    type: GET_POST_DETAILS_FAIL,
    payload: error,
  };
};

export const getComments = (id) => {
  return {
    type: GET_COMMENTS,
    payload: id,
  };
};

export const getCommentsSuccess = (comments) => {
  return {
    type: GET_COMMENTS_SUCCESS,
    payload: comments,
  };
};

export const getCommentsFail = (error) => {
  return {
    type: GET_COMMENTS_FAIL,
    payload: error,
  };
};

export const sortPost = (value) => {
  return {
    type: SORT_POST,
    payload: value,
  };
};

export const sortPostSuccess = (posts) => {
  return {
    type: SORT_POST_SUCCESS,
    payload: posts,
  };
};

export const sortPostFail = (error) => {
  return {
    type: SORT_POST_FAIL,
    payload: error,
  };
};
