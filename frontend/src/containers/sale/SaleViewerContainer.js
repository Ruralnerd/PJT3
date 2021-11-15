import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SaleViewer from '../../components/sale/SaleViewer'
import { postPay } from '../../modules/pay'
import { get, unloadSale } from '../../modules/sale'

const SaleViewerContainer = ({ match }) => {
  const { market_pk } = match.params
  const dispatch = useDispatch()
  const { detail, error, loading, data } = useSelector(
    ({ sale, loading, pay }) => ({
      detail: sale.detail,
      error: sale.error,
      loading: loading['sale/GET'],
      data: pay.data,
    }),
  )

  useEffect(() => {
    dispatch(get({ market_pk }))
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadSale())
    }
  }, [dispatch, market_pk])

  const onPostPay = () => {
    dispatch(postPay({ quantity: 100, address: '', phone: '', market_pk }))
  }

  return (
    <SaleViewer
      detail={detail}
      loading={loading}
      error={error}
      onPostPay={onPostPay}
    />
  )
}

export default SaleViewerContainer
