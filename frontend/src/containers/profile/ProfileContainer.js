import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileForm from '../../components/profile/ProfileForm'
import { getProfile, unloadProfile } from '../../modules/profile'
import { logout } from '../../modules/auth'
import { withRouter } from 'react-router-dom'

const ProfileContainer = ({ match, history }) => {
  const { userData } = useSelector(({ profile }) => ({
    userData: profile.userData,
  }))

  const { id } = match.params

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfile(id))
    return () => {
      dispatch(unloadProfile())
    }
  }, [dispatch, id])

  const onLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    history.push('/')
    window.location.reload()
  }
  return (
    <div>
      <ProfileForm userData={userData} onLogout={onLogout} />
    </div>
  )
}

export default withRouter(ProfileContainer)
