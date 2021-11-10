import axios from 'axios'

// id값을 넣으면 profiles에 들어있는 해당 id를 가진 객체를 요청한다.
export const getProfile = () => axios.get(`http://localhost:4000/profiles`)
