// search
import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getSearch = ({ mainKeyword, keyword }) => {
  client.defaults.params = null
  return client.get(`/api/v1/searches/categorys/${mainKeyword}/`, {
    // ?category_name=goguma
    params: { category_name: keyword },
  })
}
// export const getSearch = () => {
//   console.log('하이 ㅋㅋ')
// }
