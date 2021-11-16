import client from './client'

export const postPay = ({ quantity, address, phone, market_pk }) =>
  client.post(`/api/v1/sales/markets/${market_pk}/request/`, {
    quantity,
    address,
    phone,
  })
