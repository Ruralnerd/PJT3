import { handleActions } from 'redux-actions'
import * as api from '../lib/api/market'
import createRequestThunk from '../lib/createRequestThunk'

const GET_POST = `market/GET_POST`
const GET_POST_SUCCESS = `market/GET_POST_SUCCESS`

const GET_POSTS = `market/GET_POSTS`
const GET_POSTS_SUCCESS = `market/GET_POSTS_SUCCESS`

export const getPost = createRequestThunk(GET_POST, api.getPost)
export const getPosts = createRequestThunk(GET_POSTS, api.getPosts)

const initialState = {
  post: null,
  posts: null,
}

const market = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, // 요청 완료
      },
      post: action.payload,
    }),

    [GET_POSTS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POSTS: false, // 요청 완료
      },
      posts: action.payload,
    }),
  },
  initialState,
)

export default market
