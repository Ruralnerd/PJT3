// story
import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getStorys = () =>
  client.get(`/api/v1/articles/storys/`, {
    params: { num: 1000, option: 'popular' },
  })

export const getStory = (id) => client.get(`/api/v1/articles/storys/${id}`)

export const postStory = ({ title }) =>
  client.post('/api/v1/articles/storys/', { title })

export const putStory = ({ id, title, contents, categorys }) =>
  client.put(
    `/api/v1/articles/storys/${id}/`,
    {
      title,
      contents,
      categorys,
    },
    { headers: { 'Content-Type': 'application/json' } },
  )

export const deleteStory = (id) =>
  client.delete(`/api/v1/articles/storys/${id}`)

export const imageUpload = ({ formData, id }) =>
  client.post(`/api/v1/articles/storys/${id}/img/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
