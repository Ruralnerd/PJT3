// home
import client from './client'

export const getCarousel = () =>
  client.get(`/api/v1/sales/markets/`, {
    params: { num: 5, option: 'manyorder' },
  })

export const getPopular = (num) =>
  client.get(`/api/v1/sales/markets/`, {
    params: { num: num, option: 'popular' },
  })

export const getRecently = (num) =>
  client.get(`/api/v1/sales/markets/`, {
    params: { num: num, option: 'created_at' },
  })

export const getStorys = () =>
  client.get(`/api/v1/articles/storys/`, {
    params: { num: 100, option: 'popular' },
  })
