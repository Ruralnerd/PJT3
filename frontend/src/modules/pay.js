import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as payAPI from '../lib/api/pay'

const CHANGE_FIELD = 'pay/CHANGE_FIELD'
const [POST_PAY, POST_PAY_SUCCESS, POST_PAY_FAILURE] =
  createRequestActionTypes('pay/POST_PAY')

export const changeField = createAction(
  CHANGE_FIELD,

  ({ key, value }) => ({
    key,
    value, // 실제 바꾸려는 값
  }),
)

export const postPay = createAction(
  POST_PAY,
  ({ quantity, address, phone, market_pk }) => ({
    quantity,
    address,
    phone,
    market_pk,
  }),
)

const postPaySaga = createRequestSaga(POST_PAY, payAPI.postPay)

export function* paySaga() {
  yield takeLatest(POST_PAY, postPaySaga)
}

const initialState = {
  quantity: 0,
  address: '',
  phone: '',
  data: null,
  error: null,
}

const pay = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { key, value } }) =>
      produce(state, (draft) => {
        draft[key] = value
      }),
    [POST_PAY_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      data,
    }),
    [POST_PAY_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
)

export default pay
