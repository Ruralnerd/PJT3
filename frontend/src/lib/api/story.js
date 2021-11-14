// story
import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getStorys = () => {
  client.defaults.params = { num: 1000, option: 'popular' }
  return client.get(`/api/v1/articles/storys/`)
}

export const getStory = (id) => {
  client.defaults.params = null
  return client.get(`/api/v1/articles/storys/${id}`)
}

export const postStory = (title) => {
  client.defaults.params = null
  return client.post('/api/v1/articles/storys/', title)
}

export const putStory = ({ id, title, contents, categorys }) => {
  client.defaults.headers['Content-Type'] = 'application/json'
  return client.put(`/api/v1/articles/storys/${id}/`, {
    title,
    contents,
    categorys,
  })
}

export const deleteStory = (id) => {
  client.defaults.params = null
  return client.delete(`/api/v1/articles/storys/${id}`)
}

export const imageUpload = ({ formData, id }) => {
  client.defaults.headers['Content-Type'] = 'multipart/form-data'
  return client.post(`/api/v1/articles/storys/${id}/img/`, formData)
}
