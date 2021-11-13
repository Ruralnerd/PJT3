import SaleForm from '../../components/sale/SaleForm'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, next, post, prev, postSaleImg } from '../../modules/sale'
/**
 * SaleForm을 import해서 사용, 필요한 state 관리
 */
const MarketSaleForm = () => {
  const dispatch = useDispatch()
  const { form } = useSelector(({ sale }) => ({
    form: sale.item,
  }))

  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target

    dispatch(
      changeField({
        form: 'item',
        key: name,
        value,
      }),
    )
  }

  // 폼 등록 이벤트 핸들러
  const onPostSale = (e) => {
    e.preventDefault()
    const { title, unit, quantity, price, period } = form
    dispatch(
      post({
        title,
        unit,
        quantity,
        price,
        period,
      }),
      next(),
    )
  }

  const onPostImage = (e) => {
    const img = e.target.files[0]
    const { id } = form
    dispatch(postSaleImg({ img, market_pk: id }))
  }

  // 컴포넌트 이동 핸들러
  const onPrev = () => {
    dispatch(prev())
  }
  const onNext = () => {
    dispatch(next())
  }

  return (
    <div>
      <SaleForm
        form={form}
        onPrev={onPrev}
        onNext={onNext}
        onChange={onChange}
        onPostSale={onPostSale}
        onPostImage={onPostImage}
      />
    </div>
  )
}

export default MarketSaleForm
