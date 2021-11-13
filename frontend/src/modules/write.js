import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as postsAPI from '../lib/api/posts'
import { takeLatest } from 'redux-saga/effects'

const INITIALIZE = 'write/INITIALIZE' // 모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD' // 특정 key 값 바꾸기

// const IMAGE_UPLOAD = 'write/IMAGE_UPLOAD'

// 페이크 게시글작성
const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('write/WRITE_POST') // 포스트 작성

// 얘가 진짜게시글작성PUT
// const [WRITE_PUT, WRITE_PUT_SUCCESS, WRITE_PUT_FAILURE] =
//   createRequestActionTypes('write/WRITE_PUT') // 포스트 작성

const [IMAGE_UPLOAD, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_FAILURE] =
  createRequestActionTypes('write/IMAGE_UPLOAD')

export const initialize = createAction(INITIALIZE)
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}))

// export const writePost = createAction(WRITE_POST, () => ({}))

export const writePost = createAction(
  WRITE_POST,
  ({ title, contents, categorys }) => ({
    title,
    contents,
    categorys,
  }),
)
// (formData) => formData,

export const imageUpload = createAction(IMAGE_UPLOAD, (formData) => formData)

// 사가 생성
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost)
// const writePutSaga = createRequestSaga(WRITE_PUT, postsAPI.writePut)
const imageUploadSaga = createRequestSaga(IMAGE_UPLOAD, postsAPI.imageUpload)

export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga)
  // yield takeLatest(WRITE_PUT, writePutSaga)
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
}

const write = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [WRITE_POST]: (state) => ({
      ...state,
      // post와 postError를 초기화
      post: null,
      postError: null,
    }),
    // 포스트 작성 성공
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    // 포스트 작성 실패
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    // [WRITE_PUT]: (state) => ({
    //   ...state,
    //   // post와 postError를 초기화
    //   post: null,
    //   postError: null,
    // }),
    // // 포스트 작성 성공
    // [WRITE_PUT_SUCCESS]: (state, { payload: post }) => ({
    //   ...state,
    //   post,
    // }),
    // // 포스트 작성 실패
    // [WRITE_PUT_FAILURE]: (state, { payload: postError }) => ({
    //   ...state,
    //   postError,
    // }),
    [IMAGE_UPLOAD]: (state) => ({
      ...state,
      image: null,
      imageError: null,
      // post와 postError를 초기화
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

export default write
