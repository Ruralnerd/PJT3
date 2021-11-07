import { combineReducers } from 'redux'
import market from './market'
import loading from './loading'

const rootReducer = combineReducers({
  market,
  loading,
})

export default rootReducer
