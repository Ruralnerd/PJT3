import SaleForm from '../../components/sale/SaleForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeField,
  post,
  postSaleImg,
  put,
  prev,
  next,
  putChangeField,
  addContent,
  deleteSale,
} from '../../modules/sale'
import { withRouter } from 'react-router'
import { useEffect } from 'react'

/**
 * SaleForm을 import해서 사용, 필요한 state 관리
 */
const SaleFormContainer = ({ history }) => {
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

  const onPutChange = (e) => {
    const { value } = e.target
    const { current_page } = form
    dispatch(
      putChangeField({
        sequence: current_page - 2,
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

  const onPutSale = () => {
    const {
      title,
      unit,
      quantity,
      price,
      period,
      contents,
      storys,
      categorys,
      id,
    } = form

    dispatch(
      put({
        title,
        unit,
        quantity,
        price,
        period,
        contents,
        storys,
        categorys,
        market_pk: id,
      }),
    )
    alert('판매글을 등록했습니다.')
    history.push('/market')
  }

  const onDeleteSale = () => {
    const { id } = form
    dispatch(deleteSale({ market_pk: id }))
    history.push('/market')
  }

  // 컴포넌트 이동 핸들러
  const onPrev = () => {
    dispatch(prev())
  }

  const onNext = () => {
    dispatch(next())
  }

  const onAddContent = () => {
    if (form.contents[form.current_page - 2].img === '') {
      alert('사진은 꼭 넣어주셔야 해요!')
    } else {
      dispatch(addContent())
    }
  }

  return (
    <div>
      <SaleForm
        form={form}
        onPrev={onPrev}
        onNext={onNext}
        onChange={onChange}
        onPutChange={onPutChange}
        onPostSale={onPostSale}
        onPostImage={onPostImage}
        onPutSale={onPutSale}
        onDeleteSale={onDeleteSale}
        onAddContent={onAddContent}
      />
    </div>
  )
}

export default withRouter(SaleFormContainer)
