import { all } from '@redux-saga/core/effects'
import { combineReducers } from 'redux'
import auth, { authSaga } from './auth'
import loading from './loading'
import market from './market'
import story from './story'
import write, { writeSaga } from './write'
import sale, { saleSaga } from './sale'

const rootReducer = combineReducers({
  auth,
  sale,
  market,
  loading,
  write,
  story,
})

export function* rootSaga() {
  yield all([authSaga(), saleSaga(), writeSaga()])
}

export default rootReducer
