import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const postSale = async ({ title, unit, quantity, price, period }) => {
  client.post('api/v1/sales/markets/', { title, unit, quantity, price, period })
}

export const putSale = ({ market_pk }) => {
  client.put(`api/v1/sales/markets/${market_pk}`)
}
