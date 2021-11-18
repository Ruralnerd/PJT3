import client from './client'

// 로그인
export const login = ({ email, password }) =>
  client.post('/api/v1/accounts/login/', { email, password })

// 회원가입
export const register = ({ email, password, nickname }) =>
  client.post('/api/v1/accounts/users/', { email, password, nickname })
