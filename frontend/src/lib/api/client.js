import axios from 'axios'

const client = axios.create()

/**
  글로벌 설정 예시:

  // API 주소를 다른 곳으로 사용할 때
  client.defaults.baseURL = 'https://external-api-server.com/'

  // 헤더 설정
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`

  // 인터셉터 설정
  axios.intercepter.response.use({
    response => {
      // 요청 성공 시 특정 작업 수행
      return response;
    },
    error => {
      // 요청 실패 시 특정 작업 수행
      return Promise.reject(error)
    }
  })
 */
// 로그인 체크를 위한 전역 헤더 설정
const ACCESS_TOKEN = localStorage.getItem('token')
client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`

export default client
