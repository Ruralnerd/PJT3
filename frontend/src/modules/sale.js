import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as saleAPI from '../lib/api/sale'

const CHANGE_FIELD = 'sale/CHANGE_FIELD'

// 액션 타입 정의
const [POST, POST_SUCCESS, POST_FAILURE] = createRequestActionTypes('sale/POST')
const [PUT, PUT_SUCCESS, PUT_FAILURE] = createRequestActionTypes('sale/PUT')
const [GET, GET_SUCCESS, GET_FAILURE] = createRequestActionTypes('sale/GET')

// 액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,

  ({ form, key, value }) => ({
    form, // item, content
    key,
    value, // 실제 바꾸려는 값
  }),
)

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
const postSaga = createRequestSaga(POST, saleAPI.postSale)
const putSaga = createRequestSaga(PUT, saleAPI.putSale)

export function* saleSaga() {
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
    price: 0,
    period: '2021-11-11T01:24:15.393Z',
  },
  content: {},
  level: 0,
}

const sale = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value
      }),
    [POST_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      [state.item.id]: [data.id],
    }),
  },
  initialState,
)

export default sale
