import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileForm from '../../components/profile/ProfileForm'
import { getProfile } from '../../modules/profile'
import { logout } from '../../modules/auth'
import { withRouter } from 'react-router-dom'

const ProfileContainer = ({ history }) => {
  const { userData, id } = useSelector(({ profile, auth }) => ({
    userData: profile.userData,
    id: auth.auth.id,
  }))

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile(id))
  }, [dispatch, id])

  const onLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    history.push('/')
  }
  return (
    <div>
      <ProfileForm userData={userData} onLogout={onLogout} />
    </div>
  )
}

export default withRouter(ProfileContainer)
