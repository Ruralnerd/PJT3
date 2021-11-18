import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SaleList from '../../components/sale/SaleList'
import { getList } from '../../modules/sale'

const SaleListContainer = () => {
  const dispatch = useDispatch()
  const { num, option, error, loading, sales, auth } = useSelector(
    ({ auth, sale, loading }) => ({
      num: sale.num,
      option: sale.option,
      sales: sale.list,
      error: sale.error,
      auth: auth.auth,
      loading: loading['sale/GET_LIST'],
    }),
  )
  useEffect(() => {
    dispatch(getList({ num, option }))
  }, [dispatch, num, option])

  return <SaleList auth={auth} sales={sales} error={error} loading={loading} />
}

export default SaleListContainer
