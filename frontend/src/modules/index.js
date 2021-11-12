import { all } from '@redux-saga/core/effects'
import { combineReducers } from 'redux'
import auth, { authSaga } from './auth'
import loading from './loading'
import market from './market'
import sale, { saleSaga } from './sale'

const rootReducer = combineReducers({
  auth,
  sale,
  market,
  loading,
})

export function* rootSaga() {
  yield all([authSaga(), saleSaga()])
}

export default rootReducer
