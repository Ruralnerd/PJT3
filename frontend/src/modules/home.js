import { createAction, handleActions } from 'redux-actions'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as postsAPI from '../lib/api/home'
import { takeLatest } from 'redux-saga/effects'

// 전체 스토리 가져오기
const [GET_CAROUSEL, GET_CAROUSEL_SUCCESS, GET_CAROUSEL_FAILURE] =
  createRequestActionTypes('home/GET_CAROUSEL')

const [GET_POPULAR, GET_POPULAR_SUCCESS, GET_POPULAR_FAILURE] =
  createRequestActionTypes('home/GET_POPULAR')

const [GET_RECENTLY, GET_RECENTLY_SUCCESS, GET_RECENTLY_FAILURE] =
  createRequestActionTypes('home/GET_RECENTLY')

const [GET_STORYS, GET_STORYS_SUCCESS, GET_STORYS_FAILURE] =
  createRequestActionTypes('home/GET_STORYS')

export const getCarousel = createAction(GET_CAROUSEL)
export const getPopular = createAction(GET_POPULAR)
export const getRecently = createAction(GET_RECENTLY)

export const getStorys = createAction(GET_STORYS)

// 사가 생성
const getCarouselSaga = createRequestSaga(GET_CAROUSEL, postsAPI.getCarousel)
const getPopularSaga = createRequestSaga(GET_POPULAR, postsAPI.getPopular)
const getRecentlySaga = createRequestSaga(GET_RECENTLY, postsAPI.getRecently)

const getStorysSaga = createRequestSaga(GET_STORYS, postsAPI.getStorys)

export function* homeSaga() {
  yield takeLatest(GET_CAROUSEL, getCarouselSaga)
  yield takeLatest(GET_POPULAR, getPopularSaga)
  yield takeLatest(GET_RECENTLY, getRecentlySaga)
  yield takeLatest(GET_STORYS, getStorysSaga)
}

const initialState = {
  carouselList: [],
  popularList: [],
  seasonalList: [],
  storys: [],
}

const home = handleActions(
  {
    [GET_CAROUSEL]: (state) => ({
      ...state,
    }),
    [GET_CAROUSEL_SUCCESS]: (state, { payload: carouselList }) => ({
      ...state,
      carouselList,
    }),
    [GET_CAROUSEL_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_POPULAR]: (state) => ({
      ...state,
    }),
    [GET_POPULAR_SUCCESS]: (state, { payload: popularList }) => ({
      ...state,
      popularList,
    }),
    [GET_POPULAR_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_RECENTLY]: (state) => ({
      ...state,
    }),
    [GET_RECENTLY_SUCCESS]: (state, { payload: seasonalList }) => ({
      ...state,
      seasonalList,
    }),
    [GET_RECENTLY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
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
  },
  initialState,
)

export default home
