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

const [GET_PROFILES, GET_PROFILES_SUCCESS, GET_PROFILES_FAILURE] =
  createRequestActionTypes('profile/GET_PROFILES')

const CHANGE_FIELD = 'profile/CHANGE_FIELD'

const [PUT_PROFILE, PUT_PROFILE_SUCCESS, PUT_PROFILE_FAILURE] =
  createRequestActionTypes('profile/PUT_PROFILE')

const UNLOAD_PROFILE = 'profile/UNLOAD' //포스트 페이지에서 벗어날 때 데이터 비우기

// 액션 생성 함수
export const getProfile = createAction(GET_PROFILE)
export const getProfiles = createAction(GET_PROFILES)
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

export const putProfile = createAction(
  PUT_PROFILE,
  ({
    user_pk,
    email,
    nickname,
    password,
    address,
    phone,
    is_seller,
    ac_number,
    ac_bank,
  }) => ({
    user_pk,
    email,
    nickname,
    password,
    address,
    phone,
    is_seller,
    ac_number,
    ac_bank,
  }),
)

// Saga
const getProfileSaga = createRequestSaga(GET_PROFILE, profileAPI.getProfile)
const getProfilesSaga = createRequestSaga(GET_PROFILES, profileAPI.getProfiles)
const putProfileSaga = createRequestSaga(PUT_PROFILE, profileAPI.putProfile)

// 제너레이터함수
export function* profileSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga)
  yield takeLatest(GET_PROFILES, getProfilesSaga)
  yield takeLatest(PUT_PROFILE, putProfileSaga)
}

const initialState = {
  userData: {
    id: 0,
    storys: [],
    markets: [],
    following: [],
    password: '',
    last_login: '',
    email: '',
    nickname: '',
    phone: '',
    address: '',
    profile_img: '/media/default_profile.jpeg',
    created_at: '',
    is_seller: false,
    ac_number: '',
    ac_bank: '',
    is_admin: false,
    provider: '',
    followers: [],
  },
  market_num: 2, // 프로필 당 최대 몇 개의 마켓 정보를 가져올것인지
  profiles: [],
  error: null,
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
    [GET_PROFILES_SUCCESS]: (state, { payload: profiles }) => ({
      ...state,
      profiles,
    }),
    [GET_PROFILES_FAILURE]: (state, { payload: error }) => ({
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
