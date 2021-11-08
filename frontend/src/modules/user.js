import { createAction, handleActions } from 'redux-actions'
import { takeLatest } from 'redux-saga/effects'
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga'
import * as authAPI from '../lib/api/auth'

/*
  Backlog:
  유저 체크를 위한 리덕스
  JWT를 localStorage에 직접 저장하지 않는 방법
  백엔드에게 check API를 요청해서 응답으로는 유저의 _id, email을 받아야 한다.
*/
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('user/CHECK')

export const check = createAction(CHECK)

const checkSaga = createRequestSaga(CHECK, authAPI.check)
export function* userSaga() {
  yield takeLatest(CHECK, checkSaga)
}
