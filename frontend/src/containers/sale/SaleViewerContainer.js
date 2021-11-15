import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SaleViewer from '../../components/sale/SaleViewer'
import { get, unloadSale } from '../../modules/sale'

const SaleViewerContainer = ({ match }) => {
  const { market_pk } = match.params
  const dispatch = useDispatch()
  const { detail, error, loading } = useSelector(({ sale, loading }) => ({
    detail: sale.detail,
    error: sale.error,
    loading: loading['sale/GET'],
  }))

  useEffect(() => {
    dispatch(get({ market_pk }))
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadSale())
    }
  }, [dispatch, market_pk])

  return <SaleViewer detail={detail} loading={loading} error={error} />
}

export default SaleViewerContainer
