import { get, } from "./api_helper";
import * as url from "./url_helper";

//Post
export const getPosts = (currentPage) => 
  get(url.GET_POSTS, {
    // params: {
    //   currentPage: currentPage,
    // }
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