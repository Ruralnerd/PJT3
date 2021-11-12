import { all } from '@redux-saga/core/effects'
import { combineReducers } from 'redux'
import auth, { authSaga } from './auth'
import loading from './loading'
import market from './market'
import story from './story'
import write, { writeSaga } from './write'

const rootReducer = combineReducers({
  auth,
  market,
  loading,
  write,
  story,
})

export function* rootSaga() {
  yield all([authSaga(), writeSaga()])
}

export default rootReducer
