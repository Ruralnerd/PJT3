import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const postPay = ({ quantity, address, phone, market_pk }) =>
  client.post(`/api/v1/sales/markets/${market_pk}/request/`, {
    quantity,
    address,
    phone,
  })
