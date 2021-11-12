// 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 한다.
// 리덕스로부터 받은 상태 데이터를 Component로 전달해준다.

// modules/profile.js에서 작성했던 액션 생성 함수와 상태 안에 있던 값을 컴포넌트의 props로 전달

import React from 'react'
import { connect } from 'react-redux'
import Profile from '../../components/profile/Profile'
import { getProfile } from '../../modules/profile'

const { useEffect } = React

// modules/profile.js에서 3개단위로 끊어서 가져와야 함
// 1. getProfile함수
// 2. profile 초기상태
// 3. loadingProfile
const ProfileContainer = ({ getProfile, userData, loadingProfile }) => {
  console.log('컨테이너')
  // useEffect를 사용할 때에는 첫번째 파라미터에는 함수, 두번째 파라미터에는 의존값이 들어있는 배열을 넣는다.
  // 만약 의존값이 들어있는 배열을 비우게 된다면, 컴포넌트가 처음 나타날때에만 useEffect에 등록한 함수가 호출된다.
  // useEffect에서 반환하는 함수를 cleanup 함수라고 부르는데
  // 의존값이 들어있는 배열이 비어있을 경우, 컴포넌트가 사라질 때 cleanup함수가 호출됨

  // 컴포넌트가 처음 렌더링 될 때 해당 유저의 profile값을 가져와야 함
  useEffect(() => {
    console.log(getProfile())
    getProfile()
    return () => {
      console.log('의존값 비어있음')
    }
  }, [getProfile])
  return (
    <div>
      <Profile userData={userData} loadingProfile={loadingProfile} />
    </div>
  )
}

// connect함수를 사용하여 리덕스와 연동
// mapStateToProps : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
// mapDispatchToProps : 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수

// connect 함수 내에서는 액션 생성 함수를 호출하여 디스패치함
// 즉, 컴포넌트에서 액션을 디스패치한다.
export default connect(
  ({ profile, loading }) => ({
    userData: profile.userData,
    loadingProfile: loading['profile/GET_PROFILE'],
  }),
  {
    getProfile,
  },
)(ProfileContainer)
