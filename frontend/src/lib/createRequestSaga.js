import { call, put } from 'redux-saga/effects'
import { startLoading, finishLoading } from '../modules/loading'

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type} SUCCESS`
  const FAILURE = `${type} FAILURE`
  return [type, SUCCESS, FAILURE]
}

export default function createRequestSaga(type, request) {
  const SUCCESS = `${type} SUCCESS`
  const FAILURE = `${type} FAILURE`

  return function* (action) {
    yield put(startLoading(type)) // 로딩 시작
    try {
      /*
        call(request, action.payload)은
        authAPI.{type}(action.payload)과 같다!

        예시) authAPI.register({email, nickname, password})
      */
      const response = yield call(request, action.payload)
      yield put({
        type: SUCCESS,
        payload: response.data,
      })
    } catch (e) {
      yield put({
        type: FAILURE,
        payload: e,
        error: true,
      })
    }
    yield put(finishLoading(type)) // 로딩 끝
  }
}
