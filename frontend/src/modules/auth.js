import produce from 'immer'
import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as authAPI from '../lib/api/auth'

const CHANGE_FIELD = 'auth/CHANGE_FIELD'
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM'
const CHECK = 'auth/CHECK'
const LOGOUT = 'auth/LOGOUT'

// 액션 타입 정의
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER')
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN')

// 액션 생성 함수
export const changeField = createAction(
  CHANGE_FIELD,

  ({ form, key, value }) => ({
    form, // register, login
    key, // email, password, passwordConfirm, phone, address, nickname
    value, // 실제 바꾸려는 값
  }),
)
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form) // register / login
export const register = createAction(
  REGISTER,
  ({ email, nickname, password }) => ({
    email,
    password,
    nickname,
  }),
)

export const login = createAction(LOGIN, ({ email, password }) => ({
  email,
  password,
}))
export const check = createAction(CHECK, ({ token }) => ({
  token,
}))
export const logout = createAction(LOGOUT)

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
  auth: null, // 로그인 된 상태인지 체크
  authError: null,
  user: null,
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
      user: null, // 폼 전환 시 회원가입했던 기록 초기화
    }),
    [REGISTER_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      authError: null,
      /**
       * 여기서 리턴되는 값은 user info
       */
      user,
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
    [CHECK]: (state, { payload: token }) => ({
      ...state,
      auth: token,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      auth: null,
    }),
  },
  initialState,
)

export default auth
