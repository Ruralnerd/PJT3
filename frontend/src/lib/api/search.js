// search
import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getSearch = ({ mainKeyword, keyword }) =>
  client.get(`/api/v1/searches/categorys/${mainKeyword}/`, {
    params: { category_name: keyword },
  })
