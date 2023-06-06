import { get, } from "./api_helper";
import * as url from "./url_helper";

//Post
export const getPosts = (start, end) => 
  get(url.GET_POSTS, {
    params: {
      _start: start,
      _end: end
    }
  });

//Post
export const getPostDetails = (id) =>
  get(url.GET_POST_DETAILS, {
    params: {
      id: id,
    },
 });

//Comments
export const getComments = (id) =>
  get(url.GET_POST_COMMENTS, {
    params: {
      postId: id,
    },
 });

//Sort
export const sortPost = (value, start, end) =>
  get(url.GET_POSTS, {
    params: {
      _sort: value,
      _start: start,
      _end: end
    },
 });

//Users
export const getUserDetails = (id) =>
  get(url.GET_USER_DETAILS, {
    params: {
      id: id,
    },
 });

 //Posts
export const getUsersPosts = (id) =>
get(url.GET_USERS_POSTS, {
  params: {
    userId: id,
  },
});