// 이 페이지에서 판매자일 경우 Seller.js
// 구매자일 경우 Buyer.js를 렌더링해준다.
import ProfileTemplate from '../components/home/HomeTemplate'
import Buyer from '../containers/profile/Buyer'
import Seller from '../containers/profile/Seller'

const ProfilePage = () => {
  return (
    <ProfileTemplate>
      <Seller />
      <Buyer />
    </ProfileTemplate>
  )
}

export default ProfilePage
