import { combineReducers } from 'redux'
const state1 = true

function reducer(state = state1, action) {
  return state
}
const rootReducer = combineReducers({ reducer })

export default rootReducer
