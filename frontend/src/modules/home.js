// import { handleActions } from 'redux-actions'
// import * as api from '../lib/api/home'
// import createRequestThunk from '../lib/createRequestThunk'

// const GET_POST = `home/GET_POST`
// const GET_POST_SUCCESS = `home/GET_POST_SUCCESS`

// const GET_POSTS = `home/GET_POSTS`
// const GET_POSTS_SUCCESS = `home/GET_POSTS_SUCCESS`

// export const getPost = createRequestThunk(GET_POST, api.getPost)
// export const getPosts = createRequestThunk(GET_POSTS, api.getPosts)

// const initialState = {
//   post: null,
//   posts: null,
//   slideList: null,
//   hotProductList: null,
//   seasonalProductList: null,
//   farmerStoryList: null,
// }

// const home = handleActions(
//   {
//     [GET_POST_SUCCESS]: (state, action) => ({
//       ...state,
//       post: action.payload,
//     }),

//     [GET_POSTS_SUCCESS]: (state, action) => ({
//       ...state,
//       posts: action.payload,
//     }),
//   },
//   initialState,
// )

// export default home
