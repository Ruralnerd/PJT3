import client from './client'

export const getProfile = (id) => client.get(`/api/v1/accounts/users/${id}/`)

export const putProfile = ({
  user_pk,
  email,
  nickname,
  password,
  address,
  phone,
  is_seller,
  ac_number,
  ac_bank,
}) => {
  return client.put(`/api/v1/accounts/users/${user_pk}/`, {
    email,
    nickname,
    password,
    address,
    phone,
    is_seller,
    ac_number,
    ac_bank,
  })
}

export const getProfiles = ({ num }) =>
  client.get(`/api/v1/accounts/users/`, { params: { num } })
