import { all } from '@redux-saga/core/effects'
import { combineReducers } from 'redux'
import home from './home'
import profile from './profile'
import market from './market'
import auth, { authSaga } from './auth'
import loading from './loading'

const rootReducer = combineReducers({
  home,
  profile,
  auth,
  market,
  loading,
})

export function* rootSaga() {
  yield all([authSaga()])
}

export default rootReducer
