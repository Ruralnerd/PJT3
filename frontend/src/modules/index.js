import { combineReducers } from 'redux'
import home from './home'
import profile from './profile'
import counter from './counter'

const rootReducer = combineReducers({
  counter,
  home,
  profile,
})

export default rootReducer
