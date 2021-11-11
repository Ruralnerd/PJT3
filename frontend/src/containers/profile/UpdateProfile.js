// 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 한다.
// 리덕스로부터 받은 상태 데이터를 Component로 전달해준다.

// modules/profile.js에서 작성했던 액션 생성 함수와 상태 안에 있던 값을 컴포넌트의 props로 전달

import React from 'react'
import UpdateProfile from '../../components/profile/UpdateProfile'

// modules/profile.js에서 3개단위로 끊어서 가져와야 함
// 1. getProfile함수
// 2. profile 초기상태
// 3. loadingProfile
const UpdateProfileDetail = ({ getProfile, profile, loadingProfile }) => {
  return (
    <div>
      <UpdateProfile profile={profile} loadingProfileUpdate={loadingProfile} />
    </div>
  )
}
export default UpdateProfileDetail
