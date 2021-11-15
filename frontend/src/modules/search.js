import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as postsAPI from '../lib/api/search'
import { takeLatest } from 'redux-saga/effects'

const INITIALIZE = 'search/INITIALIZE' // 모든 내용 초기화
const CHANGE_FIELD = 'search/CHANGE_FIELD' // 특정 key 값 바꾸기

const [GET_SEARCH, GET_SEARCH_SUCCESS, GET_SEARCH_FAILURE] =
  createRequestActionTypes('search/GET_SEARCH')

export const initialize = createAction(INITIALIZE)

export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}))

export const getSearch = createAction(
  GET_SEARCH,
  ({ mainKeyword, keyword }) => ({ mainKeyword, keyword }),
)

// 사가 생성
const getSearchSaga = createRequestSaga(GET_SEARCH, postsAPI.getSearch)

export function* searchSaga() {
  yield takeLatest(GET_SEARCH, getSearchSaga)
}

const initialState = {
  searchList: [],
  mainKeyword: 'markets',
  keyword: '',
  error: null,
}

const search = handleActions(
  {
    [INITIALIZE]: (state) => initialState, // initialState를 넣으면 초기 상태로 바뀜
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value, // 특정 key 값을 업데이트
    }),
    [GET_SEARCH]: (state) => ({
      ...state,
    }),
    [GET_SEARCH_SUCCESS]: (state, { payload: searchList }) => ({
      ...state,
      searchList,
    }),
    [GET_SEARCH_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
)

export default search
