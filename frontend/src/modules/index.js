import { all } from '@redux-saga/core/effects'
import { combineReducers } from 'redux'
import auth, { authSaga } from './auth'
import loading from './loading'
import market from './market'

const rootReducer = combineReducers({
  auth,
  market,
  loading,
})

export function* rootSaga() {
  yield all([authSaga()])
}

export default rootReducer
