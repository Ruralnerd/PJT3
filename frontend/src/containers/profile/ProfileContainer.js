import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Profile from '../../components/profile/Profile'
import { getProfile } from '../../modules/profile'
import { logout } from '../../modules/auth'
import { withRouter } from 'react-router-dom'

const ProfileContainer = ({ history }) => {
  const { userData } = useSelector(({ profile }) => ({
    userData: profile.userData,
  }))

  const { id } = useSelector(({ auth }) => ({
    id: auth.auth.id,
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile(id))
  }, [dispatch, id])

  const onLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    history.push('/')
  }
  return (
    <div>
      <Profile userData={userData} onLogout={onLogout} />
    </div>
  )
}

// connect함수를 사용하여 리덕스와 연동
// mapStateToProps : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
// mapDispatchToProps : 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수

// connect 함수 사용을 통해 useSelect와 useDiapatch기능을 대신함.
// connect 함수 내에서는 액션 생성 함수를 호출하여 디스패치함
// 즉, 컴포넌트에서 액션을 디스패치한다.
export default withRouter(ProfileContainer)
