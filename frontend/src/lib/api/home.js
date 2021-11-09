import axios from 'axios'

export const getPost = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)

export const getPosts = () => axios.get(`http://localhost:4000/market`)
