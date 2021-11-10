/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const SellerProfile = ({ loadingProfile, profile }) => {
  console.log('컴포넌트')
  console.log(profile)
  return (
    <div>
      <div>판매자 프로필 페이지</div>
      {loadingProfile && '로딩 중...'}
      {!loadingProfile && profile && (
        <div>
          <div>이름:{profile[0].nickname}</div>
          <div>전화번호:{profile[0].phone}</div>
        </div>
      )}
    </div>
  )
}
export default SellerProfile
