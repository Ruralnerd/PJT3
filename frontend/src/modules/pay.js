import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as payAPI from '../lib/api/pay'

const [POST_PAY, POST_PAY_SUCCESS, POST_PAY_FAILURE] =
  createRequestActionTypes('sale/POST_PAY')

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
  kakao_uri: null,
  data: null,
}

const pay = handleActions(
  {
    [POST_PAY]: (state, { payload: data }) => ({
      ...state,
      data,
    }),
  },
  initialState,
)

export default pay
