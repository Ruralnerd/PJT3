import { handleActions } from 'redux-actions'

const GET_PROFILE = 'profile/GET_PROFILE'
const GET_PRODUCTLIST = 'profile/GET_PRODUCTLIST'
const GET_STORYLIST = 'profile/GET_STORYLIST'

const initialState = {
  profile: null,
  productList: null,
  storyList: null,
}

const profile = handleActions({}, initialState)
export default profile
