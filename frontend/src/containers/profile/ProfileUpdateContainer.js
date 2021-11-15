import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileUpdateForm from '../../components/profile/ProfileUpdateForm'
import { changeField, initialize, putProfile } from '../../modules/profile'

const ProfileUpdateContainer = () => {
  const dispatch = useDispatch()
  const { form } = useSelector(({ profile }) => ({
    form: profile.userData,
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
    return () => {
      dispatch(initialize())
    }
  }, [dispatch])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(putProfile({ form }))
  }

  return (
    <div>
      <ProfileUpdateForm form={form} onChange={onChange} onSubmit={onSubmit} />
    </div>
  )
}

export default ProfileUpdateContainer
