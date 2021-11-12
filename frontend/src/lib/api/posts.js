import client from './client'

export const writePost = ({ title, img, content, categorys }) =>
  client.post('http://localhost:4000/story', { title, img, content, categorys })
// export const writePost = ({ title, body, tags }) =>
//   client.post('/api/posts', { title, body, tags })
