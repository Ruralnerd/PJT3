import { handleActions } from 'redux-actions'
import * as api from '../lib/api/story'
import createRequestThunk from '../lib/createRequestThunk'

const GET_STORYS = `story/GET_STORYS`
const GET_STORYS_SUCCESS = `story/GET_STORYS_SUCCESS`

export const getStorys = createRequestThunk(GET_STORYS, api.getStorys)

const initialState = {
  storys: null,
}

const story = handleActions(
  {
    [GET_STORYS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_STORYS: false, // 요청 완료
      },
      storys: action.payload,
    }),
  },
  initialState,
)

export default story
