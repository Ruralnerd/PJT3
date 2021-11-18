import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileUpdateForm from '../../components/profile/ProfileUpdateForm'
import {
  changeField,
  getProfile,
  initialize,
  putProfile,
} from '../../modules/profile'

const ProfileUpdateContainer = () => {
  const dispatch = useDispatch()
  const { form, loading, error, auth } = useSelector(
    ({ profile, loading, auth }) => ({
      form: profile.userData,
      error: profile.error,
      loading: loading['profile/GET_PROFILE'],
      auth: auth.auth,
    }),
  )

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
    dispatch(getProfile(auth.id))
    return () => {
      dispatch(initialize())
    }
  }, [dispatch, auth])

  const onSubmit = (e) => {
    e.preventDefault()
    const {
      email,
      nickname,
      password,
      address,
      phone,
      is_seller,
      ac_number,
      ac_bank,
    } = form
    const { id } = auth

    dispatch(
      putProfile({
        user_pk: id,
        email,
        nickname,
        password,
        address,
        phone,
        is_seller,
        ac_number,
        ac_bank,
      }),
    )
    window.location.reload()
  }

  return (
    <div>
      <ProfileUpdateForm
        form={form}
        loading={loading}
        error={error}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default ProfileUpdateContainer
