import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as postsAPI from '../lib/api/story'
import { takeLatest } from 'redux-saga/effects'

// 전체 스토리 가져오기
const [GET_STORYS, GET_STORYS_SUCCESS, GET_STORYS_FAILURE] =
  createRequestActionTypes('story/GET_STORYS')

const [GET_STORY, GET_STORY_SUCCESS, GET_STORY_FAILURE] =
  createRequestActionTypes('story/GET_STORY')

export const getStorys = createAction(GET_STORYS)
export const getStory = createAction(GET_STORY)

// 사가 생성
const getStorysSaga = createRequestSaga(GET_STORYS, postsAPI.getStorys)
const getStorySaga = createRequestSaga(GET_STORY, postsAPI.getStory)

export function* storySaga() {
  yield takeLatest(GET_STORYS, getStorysSaga)
  yield takeLatest(GET_STORY, getStorySaga)
}

const initialState = {
  storys: [],
  story: '',
  error: '',
}

const story = handleActions(
  {
    [GET_STORYS]: (state) => ({
      ...state,
    }),
    [GET_STORYS_SUCCESS]: (state, { payload: storys }) => ({
      ...state,
      storys,
    }),
    [GET_STORYS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_STORY]: (state) => ({
      ...state,
    }),
    [GET_STORY_SUCCESS]: (state, { payload: story }) => ({
      ...state,
      story,
    }),
    [GET_STORY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
)

export default story
