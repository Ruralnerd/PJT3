import SaleForm from '../../components/sale/SaleForm'
import { useDispatch, useSelector } from 'react-redux'
import { changeField, post } from '../../modules/sale'
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
  const onSubmit = (e) => {
    e.preventDefault()
    const {
      title,
      unit,
      quantity,
      price,
      period,
      contents,
      storys,
      categorys,
    } = form
    dispatch(
      post({
        title,
        unit,
        quantity,
        price,
        period,
        contents,
        storys,
        categorys,
      }),
    )
  }

  // 컴포넌트 이동 핸들러
  const onPrev = () => {}

  return (
    <div>
      <SaleForm
        type="market"
        form={form}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default MarketSaleForm
