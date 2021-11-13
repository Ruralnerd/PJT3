import client from './client'

const ACCESS_TOKEN = localStorage.getItem('token')
if (ACCESS_TOKEN) {
  client.defaults.headers.common['Authorization'] = `JWT ${ACCESS_TOKEN}`
}

export const getSaleList = ({ num, option }) =>
  client.get('api/v1/sales/markets/', { params: { num, option } })

export const postSale = ({
  title,
  unit,
  quantity,
  price,
  period,
  contents,
  storys,
  categorys,
}) => {
  let fd = new FormData()
  fd.append('title', title)
  fd.append('unit', unit)
  fd.append('quantity', quantity)
  fd.append('price', price)
  fd.append('period', period)

  const jsonContents = []
  contents.forEach((element) => {
    jsonContents.push(JSON.stringify(element))
  })

  fd.append('contents', jsonContents)
  fd.append('storys', storys)
  fd.append('categorys', categorys)

  const headers = {
    'Content-Type': 'multipart/form-data',
  }

  return client.post('api/v1/sales/markets/', fd, { headers })
}

export const putSale = ({ market_pk }) =>
  client.put(`api/v1/sales/markets/${market_pk}`)
