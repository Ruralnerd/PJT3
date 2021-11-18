import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as postsAPI from '../lib/api/story'
import { takeLatest } from 'redux-saga/effects'

const INITIALIZE = 'story/INITIALIZE' // 모든 내용 초기화
const CHANGE_FIELD = 'story/CHANGE_FIELD' // 특정 key 값 바꾸기

const [POST_STORY, POST_STORY_SUCCESS, POST_STORY_FAILURE] =
  createRequestActionTypes('story/STORY_POST') // 포스트 작성

// 게시글 작성 2단계(PUT)
const [PUT_STORY, PUT_STORY_SUCCESS, PUT_STORY_FAILURE] =
  createRequestActionTypes('story/PUT_STORY') // 포스트 작성

// 이미지 업로드
const [IMAGE_UPLOAD, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_FAILURE] =
  createRequestActionTypes('story/IMAGE_UPLOAD')

// 전체 스토리 가져오기
const [GET_STORYS, GET_STORYS_SUCCESS, GET_STORYS_FAILURE] =
  createRequestActionTypes('story/GET_STORYS')

const [GET_STORY, GET_STORY_SUCCESS, GET_STORY_FAILURE] =
  createRequestActionTypes('story/GET_STORY')

const [DELETE_STORY, DELETE_STORY_SUCCESS, DELETE_STORY_FAILURE] =
  createRequestActionTypes('story/DELETE_STORY')

export const initialize = createAction(INITIALIZE)

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}))

export const getStorys = createAction(GET_STORYS)

export const getStory = createAction(GET_STORY)

export const postStory = createAction(POST_STORY, ({ title }) => ({ title }))

export const putStory = createAction(
  PUT_STORY,
  ({ id, title, contents, categorys }) => ({
    id,
    title,
    contents,
    categorys,
  }),
)

export const deleteStory = createAction(DELETE_STORY, (id) => id)

export const imageUpload = createAction(IMAGE_UPLOAD, ({ id, formData }) => ({
  id,
  formData,
}))

// 사가 생성
const getStorysSaga = createRequestSaga(GET_STORYS, postsAPI.getStorys)
const getStorySaga = createRequestSaga(GET_STORY, postsAPI.getStory)
const postStorySaga = createRequestSaga(POST_STORY, postsAPI.postStory)
const putStorySaga = createRequestSaga(PUT_STORY, postsAPI.putStory)
const deleteStorySaga = createRequestSaga(DELETE_STORY, postsAPI.deleteStory)
const imageUploadSaga = createRequestSaga(IMAGE_UPLOAD, postsAPI.imageUpload)

export function* storySaga() {
  yield takeLatest(GET_STORYS, getStorysSaga)
  yield takeLatest(GET_STORY, getStorySaga)
  yield takeLatest(POST_STORY, postStorySaga)
  yield takeLatest(PUT_STORY, putStorySaga)
  yield takeLatest(DELETE_STORY, deleteStorySaga)
  yield takeLatest(IMAGE_UPLOAD, imageUploadSaga)
}

const initialState = {
  title: '',
  contents: [],
  categorys: [],
  post: null,
  postError: null,
  image: '',
  imageError: null,
  id: 0,
  storys: [],
  story: '',
  error: '',
  num: 18,
  option: 'popular',
}

const story = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
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
    [POST_STORY]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [POST_STORY_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      id: data.id,
    }),
    [POST_STORY_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [PUT_STORY]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [PUT_STORY_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [PUT_STORY_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [DELETE_STORY]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [DELETE_STORY_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      // post,
    }),
    [DELETE_STORY_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      // postError,
    }),
    [IMAGE_UPLOAD]: (state) => ({
      ...state,
      image: null,
      imageError: null,
    }),
    // 포스트 작성 성공
    [IMAGE_UPLOAD_SUCCESS]: (state, { payload: image }) => ({
      ...state,
      image,
    }),
    // 포스트 작성 실패
    [IMAGE_UPLOAD_FAILURE]: (state, { payload: imageError }) => ({
      ...state,
      imageError,
    }),
  },
  initialState,
)

export default story
