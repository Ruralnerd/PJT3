import produce from 'immer'
import { takeLatest } from 'redux-saga/effects'
import { createAction, handleActions } from 'redux-actions'
import * as profileAPI from '../lib/api/profile'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'

// 액션타입 정의
const INITIALIZE = 'profile/INITIALIZE' // 모든 내용 초기화

const [GET_PROFILE, GET_PROFILE_SUCCESS, GET_PROFILE_FAILURE] =
  createRequestActionTypes('profile/GET_PROFILE')

const CHANGE_FIELD = 'profile/CHANGE_FIELD'

const [PUT_PROFILE, PUT_PROFILE_SUCCESS, PUT_PROFILE_FAILURE] =
  createRequestActionTypes('profile/PUT')

const UNLOAD_PROFILE = 'profile/UNLOAD' //포스트 페이지에서 벗어날 때 데이터 비우기

// 액션 생성 함수
export const getProfile = createAction(GET_PROFILE)
// 액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form,
    key,
    value, // 실제 바꾸려는 값
  }),
)

export const initialize = createAction(INITIALIZE)

export const unloadProfile = createAction(UNLOAD_PROFILE)

export const putProfile = createAction(PUT_PROFILE, ({ form }) => ({
  form,
}))

// Saga
const getProfileSaga = createRequestSaga(GET_PROFILE, profileAPI.getProfile)
const putProfileSaga = createRequestSaga(PUT_PROFILE, profileAPI.putProfile)

// 제너레이터함수
export function* profileSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga)
  yield takeLatest(PUT_PROFILE, putProfileSaga)
}

const initialState = {
  userData: {
    email: '',
    nickname: '',
    password: '',
    address: '',
    phone: '',
    is_seller: false,
    ac_number: '',
    ac_bank: '',
    profile_img: 'url',
  },
  error: '',
}

const profile = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value
      }),
    [GET_PROFILE_SUCCESS]: (state, { payload: userData }) => ({
      ...state,
      userData,
    }),
    [GET_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [PUT_PROFILE_SUCCESS]: (state, { payload: userData }) => ({
      ...state,
      userData,
    }),
    [PUT_PROFILE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [UNLOAD_PROFILE]: () => initialState,
  },
  initialState,
)
export default profile
