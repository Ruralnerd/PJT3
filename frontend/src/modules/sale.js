import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as saleAPI from '../lib/api/sale'

const CHANGE_FIELD = 'sale/CHANGE_FIELD'

// 액션 타입 정의
const [GET, GET_SUCCESS, GET_FAILURE] = createRequestActionTypes('sale/GET')
const [POST, POST_SUCCESS, POST_FAILURE] = createRequestActionTypes('sale/POST')
const [PUT, PUT_SUCCESS, PUT_FAILURE] = createRequestActionTypes('sale/PUT')

// 액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,

  ({ form, key, value }) => ({
    form, // item, content
    key,
    value, // 실제 바꾸려는 값
  }),
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

// Saga
const getListSaga = createRequestSaga(GET, saleAPI.getSaleList)
const postSaga = createRequestSaga(POST, saleAPI.postSale)
const putSaga = createRequestSaga(PUT, saleAPI.putSale)

export function* saleSaga() {
  yield takeLatest(GET, getListSaga)
  yield takeLatest(POST, postSaga)
  yield takeLatest(PUT, putSaga)
}

const initialState = {
  item: {
    id: 0,
    seller: {},
    title: '',
    unit: '개',
    quantity: 0,
    price: 100,
    period: '2021-11-11T01:24:15.393Z',
  },
  contents: [
    {
      sequence: 1,
      img: null,
      content: '',
    },
  ],
  level: 0,
  /**
   * 판매글 리스트를 위한 파라미터
   * num: 글 개수
   * option: created_at, popular, manyorder
   */
  num: 25,
  option: 'created_at',
}

const sale = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value
      }),
    [GET_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      data,
    }),
    [POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      data,
    }),
    [POST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
)

export default sale
