// search
import client from './client'

export const getSearch = ({ mainKeyword, keyword }) =>
  client.get(`/api/v1/searches/categorys/${mainKeyword}/`, {
    params: { category_name: keyword },
  })
