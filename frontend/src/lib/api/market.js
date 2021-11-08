import axios from 'axios'

export const getPost = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)

export const getUsers = () =>
  axios.get(`https://jsonplaceholder.typicode.com/users`)

// 내가 만드는거
// export const getPosts = () =>
// axios.get(`https://jsonplaceholder.typicode.com/posts`)

export const getPosts = () => axios.get(`http://localhost:4000/market`)
