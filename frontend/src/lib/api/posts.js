import client from './client'

// export const writePost = (formData) => {
//   // console.log(formData)
//   // for (let value of formData.values()) {
//   //   console.log(value)
//   // }
//   client.post('/api/v1/articles/storys/', formData)
// }

export const writePost = (title) =>
  client.post('/api/v1/articles/storys/', title)

export const writePut = ({ id, title, contents, categorys }) =>
  // client.post('http://localhost:4000/story', (title, contents, categorys))
  client.put(`/api/v1/articles/storys/${id}`, { title, contents, categorys })

// 이미지 올리는 axios요청

export const imageUpload = ({ formData, id }) => {
  client.defaults.headers['Content-Type'] = 'multipart/form-data'
  return client.post(`/api/v1/articles/storys/${id}/img/`, formData)
}

// client.post('http://localhost:4000/story', { title, img, content, categorys })
// export const writePost = ({ title, body, tags }) =>
//   client.post('/api/posts', { title, body, tags })
