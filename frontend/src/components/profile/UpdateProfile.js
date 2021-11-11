/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

const Profile = ({ loadingProfile, profile }) => {
  console.log('컴포넌트')

  // profile이 빈 값이 아니고 profile.is_seller가 true일떄

  return (
    <div>
      <div>
        <div>프로필 수정 페이지</div>
        <div>이메일은 변경 불가</div>
        <div>비밀번호 수정</div>
        <div>닉네임 수정</div>
        <div>전화번호 수정</div>
        <div>주소 수정</div>
        <div>은행명 수정</div>
        <div>계좌번호 수정</div>

        <div>수정완료 버튼 누르면 다시 회원정보 조회 페이지로 이동</div>
      </div>
    </div>
  )
}
export default Profile
