import ProfileTemplate from '../../components/profile/ProfileTemplate'
import ProfileContainer from '../../containers/profile/ProfileContainer'

const ProfilePage = ({ match }) => {
  return (
    <ProfileTemplate>
      <ProfileContainer match={match} />
    </ProfileTemplate>
  )
}

export default ProfilePage
