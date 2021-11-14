import { all } from '@redux-saga/core/effects'
import { combineReducers } from 'redux'
import home from './home'
import profile, { profileSaga } from './profile'
import market from './market'
import auth, { authSaga } from './auth'
import loading from './loading'
import sale, { saleSaga } from './sale'

const rootReducer = combineReducers({
  home,
  profile,
  auth,
  sale,
  market,
  loading,
})

export function* rootSaga() {
  yield all([authSaga(), saleSaga(), profileSaga()])
}

export default rootReducer
