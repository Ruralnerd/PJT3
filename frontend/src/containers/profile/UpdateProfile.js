// 리덕스 스토어와 연동된 컴포넌트를 컨테이너 컴포넌트라고 한다.
// 리덕스로부터 받은 상태 데이터를 Component로 전달해준다.

// modules/profile.js에서 작성했던 액션 생성 함수와 상태 안에 있던 값을 컴포넌트의 props로 전달

import UpdateProfile from '../../components/profile/UpdateProfile'
import { useDispatch, useSelector } from 'react-redux'
import getProfile from '../../modules/profile'
import { useEffect } from 'react'

// modules/profile.js에서 3개단위로 끊어서 가져와야 함
// 1. getProfile함수
// 2. profile 초기상태
// 3. loadingProfile
const UpdateProfileDetail = () => {
  const dispatch = useDispatch()
  // dispatch(getProfile()) 실행 시
  // 'profile/GET_PROFILE' 타입의 액션이 전송되며,
  // profile.js의 profileSage()의 yield takeLatest(GET_PROFILE, getProfileSaga) 부분에 의해
  // 목록 조회 task가 실행된다.
  // api로딩에 성공해 'profile/GET_PROFILE'타입의 액션이 전송된다면
  // profile.js의 handleAction으로 생성된 분기 함수에서 액션을 찾아 상태 저장소의
  // userData키에 받아온 데이터를 추가한다.
  const { userData } = useSelector(({ profile, loading }) => ({
    userData: profile.userData,
    loadingProfile: loading['profile/GET_PROFILE'],
  }))

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  return (
    <div>
      <UpdateProfile userData={userData} />
    </div>
  )
}
export default UpdateProfileDetail
