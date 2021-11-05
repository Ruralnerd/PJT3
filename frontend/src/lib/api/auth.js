import client from './client'

// 로그인
export const login = ({ email, password }) =>
  client.post('/api/v1/accounts/login', { email, password })

// 회원가입
export const register = ({ email, password, nickname }) =>
  client.post('/api/v1/accounts/user', { email, password, nickname })

// TODO: 백엔드에게 만들어 달라고 요청할 것
// 로그인 상태 확인
export const check = () => {
  client.get('/api/v1/check')
}
