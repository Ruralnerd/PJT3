import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProfileAccountForm from '../../components/profile/ProfileAccountForm'
import {
  changeField,
  initialize,
  putProfile,
  getProfile,
} from '../../modules/profile'
import { withRouter } from 'react-router-dom'

const ProfileAccountContainer = ({ history }) => {
  const dispatch = useDispatch()
  const { form, id, loading, error } = useSelector(
    ({ profile, auth, loading }) => ({
      form: profile.userData,
      error: profile.error,
      id: auth.auth.id,
      loading: loading['profile/GET_PROFILE'],
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
    dispatch(getProfile(id))
    return () => {
      dispatch(initialize())
    }
  }, [dispatch, id])

  // 어떤 id에 풋요청을 해야하는지?
  const onSubmit = (e) => {
    e.preventDefault()
    const {
      id,
      email,
      nickname,
      password,
      address,
      phone,
      is_seller,
      ac_number,
      ac_bank,
    } = form
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
    history.push(`/profile/${id}`)
    window.location.reload()
  }

  return (
    <div>
      <ProfileAccountForm
        form={form}
        error={error}
        onChange={onChange}
        onSubmit={onSubmit}
        loading={loading}
      />
    </div>
  )
}

export default withRouter(ProfileAccountContainer)
