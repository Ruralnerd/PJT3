import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileList from '../../components/profile/ProfileList'
import { getProfiles } from '../../modules/profile'

const ProfileListContainer = () => {
  const dispatch = useDispatch()
  const { num, profiles, error, loading } = useSelector(
    ({ profile, loading }) => ({
      num: profile.market_num,
      profiles: profile.profiles,
      error: profile.error,
      loading: loading['profile/GET_PROFILES'],
    }),
  )

  useEffect(() => {
    dispatch(getProfiles({ num }))
  }, [dispatch, num])

  return <ProfileList profiles={profiles} error={error} loading={loading} />
}

export default ProfileListContainer
