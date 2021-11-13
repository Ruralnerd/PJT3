import client from './client'

export const writePost = (title) =>
  client.post('/api/v1/articles/storys/', title)

export const writePut = ({ id, title, contents, categorys }) => {
  client.defaults.headers['Content-Type'] = 'application/json'
  return client.put(`/api/v1/articles/storys/${id}/`, {
    title,
    contents,
    categorys,
  })
}

export const imageUpload = ({ formData, id }) => {
  client.defaults.headers['Content-Type'] = 'multipart/form-data'
  return client.post(`/api/v1/articles/storys/${id}/img/`, formData)
}
