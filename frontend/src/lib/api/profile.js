import client from './client'

export const getProfile = (id) => client.get(`/api/v1/accounts/users/${id}/`)

export const putProfile = ({ form }) =>
  client.put(`/api/v1/accounts/users/${form.id}/`, { form })
