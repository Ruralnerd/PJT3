import { all } from '@redux-saga/core/effects'
import { combineReducers } from 'redux'
import home, { homeSaga } from './home'
import profile, { profileSaga } from './profile'
import auth, { authSaga } from './auth'
import loading from './loading'
import story, { storySaga } from './story'
import sale, { saleSaga } from './sale'
import search, { searchSaga } from './search'

const rootReducer = combineReducers({
  home,
  profile,
  auth,
  sale,
  loading,
  story,
  search,
})

export function* rootSaga() {
  yield all([
    homeSaga(),
    authSaga(),
    saleSaga(),
    storySaga(),
    profileSaga(),
    searchSaga(),
  ])
}

export default rootReducer
