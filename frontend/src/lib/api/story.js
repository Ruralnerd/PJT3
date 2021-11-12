import axios from 'axios'

// export const getStory = (id) =>
//   axios.get(`https://jsonplaceholder.typicode.com/Storys/${id}`)

export const getStorys = () => axios.get(`http://localhost:4000/story`)
