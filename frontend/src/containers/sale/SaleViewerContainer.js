import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SaleViewer from '../../components/sale/SaleViewer'
import { changeField, postPay } from '../../modules/pay'
import { get, unloadSale } from '../../modules/sale'

const SaleViewerContainer = ({ match }) => {
  const { market_pk } = match.params
  const dispatch = useDispatch()
  const { detail, error, loading, data, form } = useSelector(
    ({ sale, loading, pay }) => ({
      detail: sale.detail,
      error: sale.error,
      loading: loading,
      data: pay.data,
      form: pay,
    }),
  )

  useEffect(() => {
    dispatch(get({ market_pk }))
    // 언마운트될 때 리덕스에서 포스트 데이터 없애기
    return () => {
      dispatch(unloadSale())
    }
  }, [dispatch, market_pk])

  const onChange = (e) => {
    const { name, value } = e.target

    dispatch(
      changeField({
        key: name,
        value,
      }),
    )
  }

  const onPostPay = () => {
    const { quantity, address, phone } = form
    dispatch(postPay({ quantity, address, phone, market_pk }))
  }

  useEffect(() => {
    if (data !== null) {
      const { tid, nexturl, order_id } = data
      window.open(
        nexturl,
        '카카오페이팝업',
        'width=500, height=500, scrollbars=yes, resizable=no',
        '_blank',
      )
    }
  }, [dispatch, data])

  return (
    <SaleViewer
      detail={detail}
      loading={loading}
      error={error}
      form={form}
      onChange={onChange}
      onPostPay={onPostPay}
    />
  )
}

export default SaleViewerContainer
