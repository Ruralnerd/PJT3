import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getSaleList = ({ num, option }) =>
  client.get('api/v1/sales/markets/', { params: { num, option } })

export const postSale = ({ title, unit, quantity, price, period }) => {
  return client.post('api/v1/sales/markets/', {
    title,
    unit,
    quantity,
    price,
    period,
  })
}

export const postSaleImg = ({ img, market_pk }) => {
  let fd = new FormData()
  fd.append('img', img)

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }
  return client.post(`api/v1/sales/markets/${market_pk}/img/`, fd, config)
}

export const putSale = ({
  title,
  unit,
  quantity,
  price,
  period,
  contents,
  market_pk,
}) => {
  return client.put(`api/v1/sales/markets/${market_pk}/`, {
    title,
    unit,
    quantity,
    price,
    period,
    contents,
  })
}

export const deleteSale = ({ market_pk }) =>
  client.delete(`api/v1/sales/markets/${market_pk}/`)
