import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getSaleList = ({ num, option }) =>
  client.get('api/v1/sales/markets/', { params: { num, option } })

export const postSale = ({ title, unit, quantity, price, period }) =>
  client.post('api/v1/sales/markets/', { title, unit, quantity, price, period })

export const putSale = ({ market_pk }) =>
  client.put(`api/v1/sales/markets/${market_pk}`)
