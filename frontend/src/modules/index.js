import { combineReducers } from 'redux'
import home from './home'
import profile from './profile'
import market from './market'
import loading from './loading'

const rootReducer = combineReducers({
  home,
  profile,
  market,
  loading,
})

export default rootReducer
