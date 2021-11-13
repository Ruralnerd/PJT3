import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

// client.defaults.params = { num: 3, option: 'popular' }

// export const getStory = (id) =>
//   axios.get(`https://jsonplaceholder.typicode.com/Storys/${id}`)

export const getStorys = () => client.get(`/api/v1/articles/storys/`)
