import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileForm from '../../components/profile/ProfileForm'
import { getProfile } from '../../modules/profile'
import { logout } from '../../modules/auth'
import { withRouter } from 'react-router-dom'

const ProfileContainer = ({ history }) => {
  const { userData } = useSelector(({ profile }) => ({
    userData: profile.userData,
  }))

  // const { id } = useSelector(({ auth }) => ({
  //   id: auth.auth.id,
  // }))

  const dispatch = useDispatch()

  const id = localStorage.getItem('id')

  useEffect(() => {
    console.log(id)
    dispatch(getProfile(id))
  }, [dispatch, id])

  const onLogout = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    history.push('/')
  }
  return (
    <div>
      <ProfileForm userData={userData} onLogout={onLogout} />
    </div>
  )
}

export default withRouter(ProfileContainer)
