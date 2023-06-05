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
export const sortPost = (value) =>
  get(url.GET_POSTS, {
    params: {
      _sort: value,
    },
 });