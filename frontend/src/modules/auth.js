import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as authAPI from '../lib/api/auth'

const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'

// 액션 타입 정의
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER')
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN')

export const changeField = createAction(
  CHANGE_FIELD,

  ({ form, key, value }) => ({
    form, // register, login
    key, // email, password, passwordConfirm, phone, address, nickname
    value, // 실제 바꾸려는 값
  }),
)
// 액션 생성 함수
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form) // register / login
export const register = createAction(REGISTER, ({ email, password }) => ({
  email,
  password,
})) // register / login
export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
})) // register / login

// 사가 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register)
const loginSaga = createRequestSaga(LOGIN, authAPI.login)

export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga)
  yield takeLatest(LOGIN, loginSaga)
}

// 초기 상태
const initialState = {
  register: {
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    address: '',
  },
  login: {
    email: '',
    password: '',
  },
  auth: null,
  authError: null,
}

// 리듀서
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 인증 관련 에러 초기화
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
)

export default auth
