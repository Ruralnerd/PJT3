import { handleActions } from 'redux-actions'

const GET_SLIDELIST = 'home/GET_SLIDELIST'
const GET_HOTPRODUCTLIST = 'home/GET_HOTPRODUCTLIST'
const GET_SEASONALPRODUCTLIST = 'home/GET_SEASONALPRODUCTLIST'
const GET_FARMERSTORYLIST = 'home/GET_FARMERSTORYLIST'

const initialState = {
  slideList: null,
  hotProductList: null,
  seasonalProductList: null,
  farmerStoryList: null,
}

const home = handleActions({}, initialState)
export default home
