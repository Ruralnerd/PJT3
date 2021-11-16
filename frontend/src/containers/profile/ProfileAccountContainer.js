import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileAccountForm from '../../components/profile/ProfileAccountForm'
import {
  changeField,
  initialize,
  putProfile,
  getProfile,
} from '../../modules/profile'

const ProfileAccountContainer = () => {
  const dispatch = useDispatch()
  const { form, id } = useSelector(({ profile, auth }) => ({
    form: profile.userData,
    id: auth.auth.id,
  }))

  const onChange = (e) => {
    const { value, name } = e.target

    dispatch(
      changeField({
        form: 'userData',
        key: name,
        value,
      }),
    )
  }
  // 언마운트될 때 초기화
  useEffect(() => {
    dispatch(getProfile(id))
    return () => {
      dispatch(initialize())
    }
  }, [dispatch])

  // 어떤 id에 풋요청을 해야하는지?
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(putProfile({ form }))
  }

  return (
    <div>
      <ProfileAccountForm form={form} onChange={onChange} onSubmit={onSubmit} />
    </div>
  )
}

export default ProfileAccountContainer
