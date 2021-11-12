import { takeLatest } from 'redux-saga/effects'
import { createAction, handleActions } from 'redux-actions'
import * as profileAPI from '../lib/api/profile'
import createRequestSaga from '../lib/createRequestSaga'

// 액션타입 정의
const GET_PROFILE = 'profile/GET_PROFILE'

const GET_PROFILE_SUCCESS = 'profile/GET_PROFILE_SUCCESS'

// 액션 생성 함수
export const getProfile = createAction(GET_PROFILE)

const getProfileSaga = createRequestSaga(GET_PROFILE, profileAPI.getProfile)

// 제너레이터함수.
export function* profileSaga() {
  yield takeLatest(GET_PROFILE, getProfileSaga)
}

const initialState = {
  userData: null,
}

// handleActions함수를 사용하면 각 액션마다 업데이트 함수를 설정하는 형식으로 리듀서 작성 가능
// handleActions 함수의 첫 번쨰 파라미터에는 각 액션에 대한 업데이트 함수가 담김
// 두 번쨰 미터에는 초기 상태를 넣어줌

// 핵션 생성 함수는 액션에 필요한 추가 데이터를 모두 payload라는 이름으로 사용하기 떄문에
// action.id, action.todo를 조회하는 대신, 모두 공통적으로 action.payload값을 조회하도록
// 리듀서를 구현해줘야 함.

// 모든 추가 데이터 값을 action.payload로 사용하기 때문에 나중에 리듀서 코드를 다시 볼 때
// 헷갈릴 수 있다. 따라서 객체 비구조화 할당 문법으로 action값의 payload이름을 새로 설정해주면
// action.payload가 정확히 어떤 값을 의미하는지 더 쉽게 파악할 수 있다.

// 객체 비구조화 할당 문법을 통해 payload이름을 action에서 profile로 변경해주었다.
const profile = handleActions(
  {
    [GET_PROFILE_SUCCESS]: (state, { payload: profile }) => ({
      ...state,
      userData: profile.payload,
    }),
  },
  initialState,
)
export default profile
