import StoryTemplate from '../../components/story/StoryTemplate'
import StoryDetailContainer from '../../containers/story/StoryDetailContainer'

const StoryDetailPage = ({ match }) => {
  return (
    <StoryTemplate>
      <StoryDetailContainer match={match} />
    </StoryTemplate>
  )
}

export default StoryDetailPage
