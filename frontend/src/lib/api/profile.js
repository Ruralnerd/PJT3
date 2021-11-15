import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getProfile = (id) => client.get(`/api/v1/accounts/users/${id}/`)

export const putProfile = ({ form }) => {
  return client.put(`/api/v1/accounts/users/${form.id}/`, { form })
}
