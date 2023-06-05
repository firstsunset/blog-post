import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAIL,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS,
  GET_COMMENTS_FAIL,
  GET_CURRENT_PAGE,
  SORT_POST,
  SORT_POST_SUCCESS,
  SORT_POST_FAIL,
  
} from "./actionTypes";

const initialState = {
  posts: [],
  currentPage: 0,
  pageLimit: 10,
  totalCount: 100,
  paginationMode: true,
  post: {},
  loadingPosts: false,
  loadingPostDetails: false,
  error: {
    message: "",
  },
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      state = { ...state, loadingPosts: true };
      break;
    case GET_POSTS_SUCCESS:
      state = { 
        ...state, 
        posts: action.payload.posts, 
        currentPage: state.currentPage + action.payload.currentPage,  
        loadingPosts: false ,
        paginationMode: false
      };
      break;
    case GET_POSTS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingPosts: false,
      };
      break;
    case GET_CURRENT_PAGE:
      state = { ...state, currentPage: action.payload };
      break;
    case GET_POST_DETAILS:
      state = { ...state, loadingPostDetails: true };
      break;
    case GET_POST_DETAILS_SUCCESS:
      state = { ...state, post: action.payload[0], loadingPostDetails: false };
      break;
    case GET_POST_DETAILS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingPostDetails: false,
      };
      break;
    case GET_COMMENTS:
      state = { ...state, loadingComments: true };
      break;
    case GET_COMMENTS_SUCCESS:
      state = { ...state, comments: action.payload, loadingComments: false };
      break;
    case GET_COMMENTS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingComments: false,
      };
      break;
    case SORT_POST:
      state = { ...state, loadingSortPost: true };
      break;
    case SORT_POST_SUCCESS:
      state = { ...state, posts: action.payload, paginationMode: false, loadingSortPost: false };
      break;
    case SORT_POST_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingSortPost: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default PostReducer;