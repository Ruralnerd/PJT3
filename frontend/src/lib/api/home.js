// home
import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getCarousel = () => {
  client.defaults.params = { num: 5, option: 'manyorder' }
  return client.get(`/api/v1/sales/markets/`)
}

export const getPopular = () => {
  client.defaults.params = { num: 3, option: 'popular' }
  return client.get(`/api/v1/sales/markets/`)
}

export const getSeasonal = () => {
  client.defaults.params = { num: 3, option: 'created_at' }
  return client.get(`/api/v1/sales/markets/`)
}

export const getStorys = () => {
  client.defaults.params = { num: 100, option: 'popular' }
  return client.get(`/api/v1/articles/storys/`)
}

// export const getStory = (id) => {
//   client.defaults.params = null
//   return client.get(`/api/v1/sales/markets/${id}`)
// }
