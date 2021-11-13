// story
import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getStorys = () => {
  client.defaults.params = { num: 10, option: 'popular' }
  return client.get(`/api/v1/articles/storys/`)
}

export const getStory = (id) => client.get(`/api/v1/articles/storys/${id}`)
