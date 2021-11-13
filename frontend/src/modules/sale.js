import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as saleAPI from '../lib/api/sale'

const CHANGE_FIELD = 'sale/CHANGE_FIELD'
const PREV = 'sale/PREV'
const NEXT = 'sale/NEXT'
const PUT_CHANGE_FIELD = 'sale/PUT_CHANGE_FIELD'

// 액션 타입 정의
const [GET, GET_SUCCESS, GET_FAILURE] = createRequestActionTypes('sale/GET')
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

export const getList = createAction(GET, ({ num, option }) => ({ num, option }))
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

// Saga
const getListSaga = createRequestSaga(GET, saleAPI.getSaleList)
const postSaga = createRequestSaga(POST, saleAPI.postSale)
const postImageSaga = createRequestSaga(POST_IMG, saleAPI.postSaleImg)
const putSaga = createRequestSaga(PUT, saleAPI.putSale)

export function* saleSaga() {
  yield takeLatest(GET, getListSaga)
  yield takeLatest(POST, postSaga)
  yield takeLatest(POST_IMG, postImageSaga)
  yield takeLatest(PUT, putSaga)
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
        sequence: 0,
        content: 'test',
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
   * 판매글 리스트를 위한 파라미터
   * num: 글 개수
   * option: created_at, popular, manyorder
   */
  num: 25,
  option: 'created_at',
  error: null,
  data: null,
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
    [GET_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      data,
    }),
    [POST_SUCCESS]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft['item']['id'] = data.id
        draft['item']['current_page'] = draft['item']['current_page'] + 1
      }),
    [POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [PUT_SUCCESS]: (state, { payload: data }) =>
      produce(state, (draft) => {
        draft['item'] = {
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
              content: 'test',
            },
          ],
          storys: [0],
          categorys: ['string'],
          current_page: 1,
          all_page: 2,
        }
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
  },
  initialState,
)

export default sale
