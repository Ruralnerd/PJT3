import { useSelector } from 'react-redux'
import Seller from './Seller.js'
import Customer from './Customer.js'

function MyPage() {
  const is_seller = useSelector((state) => state.is_seller)
  // 유저가 판매자일 경우 판매자 마이페이지를, 소비자일 경우 소비자 마이페이지를 렌더링.
  if (is_seller === true) {
    return <Seller />
  }
  return <Customer />
}
export default MyPage
