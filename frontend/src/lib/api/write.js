import axios from 'axios'

export const createStory = () => axios.post(`http://localhost:4000/story`)
