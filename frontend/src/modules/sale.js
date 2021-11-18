import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as saleAPI from '../lib/api/sale'

// 액션 타입 정의
const CHANGE_FIELD = 'sale/CHANGE_FIELD'
const PREV = 'sale/PREV'
const NEXT = 'sale/NEXT'
const PUT_CHANGE_FIELD = 'sale/PUT_CHANGE_FIELD'
const ADD_CONTENT = 'sale/ADD_CONTENT'
const DELETE_SALE = 'sale/DELETE_SALE'

const [GET, GET_SUCCESS, GET_FAILURE] = createRequestActionTypes('sale/GET')
const UNLOAD_POST = 'sale/UNLOAD_POST' // 포스트 페이지에서 벗어날 때 데이터 비우기
const [GET_LIST, GET_LIST_SUCCESS, GET_LIST_FAILURE] =
  createRequestActionTypes('sale/GET_LIST')
const [POST, POST_SUCCESS, POST_FAILURE] = createRequestActionTypes('sale/POST')
const [PUT, PUT_SUCCESS, PUT_FAILURE] = createRequestActionTypes('sale/PUT')
const [POST_IMG, POST_IMG_SUCCESS, POST_IMG_FAILURE] =
  createRequestActionTypes('sale/POST_IMG')

// 액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,

  ({ form, key, value }) => ({
    form, // item, content
    key,
    value, // 실제 바꾸려는 값
  }),
)

export const putChangeField = createAction(
  PUT_CHANGE_FIELD,
  ({ sequence, value }) => ({ sequence, value }),
)

export const get = createAction(GET, ({ market_pk }) => ({ market_pk }))
export const unloadSale = createAction(UNLOAD_POST)
export const getList = createAction(GET_LIST, ({ num, option }) => ({
  num,
  option,
}))

export const post = createAction(
  POST,
  ({ title, unit, quantity, price, period }) => ({
    title,
    unit,
    quantity,
    price,
    period,
  }),
)
export const put = createAction(
  PUT,
  ({
    title,
    unit,
    quantity,
    price,
    period,
    contents,
    storys,
    categorys,
    market_pk,
  }) => ({
    title,
    unit,
    quantity,
    price,
    period,
    contents,
    storys,
    categorys,
    market_pk,
  }),
)
export const postSaleImg = createAction(POST_IMG, ({ img, market_pk }) => ({
  img,
  market_pk,
}))
export const prev = createAction(PREV)
export const next = createAction(NEXT)
export const addContent = createAction(ADD_CONTENT)
export const deleteSale = createAction(DELETE_SALE)

// Saga
const getSaga = createRequestSaga(GET, saleAPI.getSale)
const getListSaga = createRequestSaga(GET_LIST, saleAPI.getSaleList)
const postSaga = createRequestSaga(POST, saleAPI.postSale)
const postImageSaga = createRequestSaga(POST_IMG, saleAPI.postSaleImg)
const putSaga = createRequestSaga(PUT, saleAPI.putSale)
const deleteSaga = createRequestSaga(DELETE_SALE, saleAPI.deleteSale)

export function* saleSaga() {
  yield takeLatest(GET, getSaga)
  yield takeLatest(GET_LIST, getListSaga)
  yield takeLatest(POST, postSaga)
  yield takeLatest(POST_IMG, postImageSaga)
  yield takeLatest(PUT, putSaga)
  yield takeLatest(DELETE_SALE, deleteSaga)
}

const initialItemState = {
  id: 0,
  title: '',
  unit: '개',
  quantity: 0,
  price: 100,
  period: '2021-11-11T01:24:15.393Z',
  contents: [
    {
      img: '',
      sequence: 0,
      content: '',
    },
  ],
  storys: [0],
  categorys: ['string'],
  current_page: 1,
  all_page: 2,
}

const initialState = {
  item: {
    id: 0,
    title: '',
    unit: '개',
    quantity: 0,
    price: 100,
    period: '2021-11-11T01:24:15.393Z',
    contents: [
      {
        img: '',
        sequence: 1,
        content: '',
      },
    ],
    storys: [0],
    categorys: ['string'],
    /**
     * 페이지 추가/삭제를 위한 파라미터
     * 상세 글, 사진 하나 올리는 페이지가 기본으로 존재하기 때문에 최소 2페이지
     * current_page 값으로 contents의 값을 넣을 때에는 -2(첫 페이지, index 특성)를 해 주어야 함
     */
    current_page: 1,
    all_page: 2,
  },
  /**
   * 판매글 상세, 리스트 페이지를 위한 파라미터
   * num: 글 개수
   * option: created_at, popular, manyorder
   * data: GET 한 글
   */
  num: 25,
  option: 'created_at',
  detail: null,
  list: null,
  error: null,
}

const sale = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value
      }),
    [PUT_CHANGE_FIELD]: (state, { payload: { sequence, value } }) =>
      produce(state, (draft) => {
        draft['item']['contents'][sequence]['content'] = value
      }),
    [PREV]: (state) =>
      produce(state, (draft) => {
        draft['item']['current_page'] = draft['item']['current_page'] - 1
      }),
    [NEXT]: (state) =>
      produce(state, (draft) => {
        draft['item']['current_page'] = draft['item']['current_page'] + 1
      }),
    [GET_SUCCESS]: (state, { payload: detail }) => ({
      ...state,
      detail,
    }),
    [GET_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_LIST_SUCCESS]: (state, { payload: list }) => ({
      ...state,
      list,
    }),
    [GET_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_POST]: () => initialState,
    [POST_SUCCESS]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft['item']['id'] = data.id
        draft['item']['current_page'] = draft['item']['current_page'] + 1
      }),
    [POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [PUT_SUCCESS]: (state) =>
      produce(state, (draft) => {
        draft['item'] = initialItemState
      }),
    [PUT_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [POST_IMG_SUCCESS]: (state, { payload: img }) =>
      produce(state, (draft) => {
        draft['item']['contents'][state.item.current_page - 2]['img'] = img.img
      }),
    [POST_IMG_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [ADD_CONTENT]: (state) =>
      produce(state, (draft) => {
        const content = {
          img: '',
          sequence: state.item.current_page, // 더미데이터 변경으로 인해, -1을 빼준다. 추가된 페이지는 2 sequence부터 시작
          content: '',
        }
        draft['item']['contents'] = draft['item']['contents'].concat(content)
        draft['item']['current_page'] = draft['item']['current_page'] + 1
        draft['item']['all_page'] = draft['item']['all_page'] + 1
      }),
    [DELETE_SALE]: (state) =>
      produce(state, (draft) => {
        draft['item'] = initialItemState
      }),
  },
  initialState,
)

export default sale
