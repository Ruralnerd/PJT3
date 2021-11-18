import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SaleViewer from '../../components/sale/SaleViewer'
import { changeField, postPay } from '../../modules/pay'
import { deleteSale, get, unloadSale } from '../../modules/sale'
import { withRouter } from 'react-router'

const SaleViewerContainer = ({ match, history }) => {
  const { market_pk } = match.params
  const dispatch = useDispatch()
  const { detail, error, loading, data, form, user_id } = useSelector(
    ({ sale, loading, pay, auth }) => ({
      detail: sale.detail,
      error: sale.error,
      loading: loading,
      data: pay.data,
      form: pay,
      user_id: auth.auth.id,
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

  const onDeleteSale = () => {
    const { id } = detail
    dispatch(deleteSale({ market_pk: id }))
    alert('판매글을 삭제했습니다.')
    history.push('/market')
  }

  return (
    <SaleViewer
      user_id={user_id}
      detail={detail}
      loading={loading}
      error={error}
      form={form}
      onChange={onChange}
      onPostPay={onPostPay}
      onDeleteSale={onDeleteSale}
    />
  )
}

export default withRouter(SaleViewerContainer)
