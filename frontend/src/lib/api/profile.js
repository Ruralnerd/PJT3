import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}
// 로그인 할 때 id값을 반환하도록 backend에서 설정해놨는데 그 id값을 사용하는방법은 아래와 같다.
// id값을 넣으면 profiles에 들어있는 해당 user_pk를 가진 객체를 요청한다.
export const getProfile = () => client.get(`/api/v1/accounts/users/1`)

// 임시
// 내정보 조회 요청
// export const getProfile = () => axios.get(`http://localhost:4000/profiles/1`)
// 프로필 수정 요청
export const putProfile = () => client.put(`http://localhost:4000/profiles/2`)
