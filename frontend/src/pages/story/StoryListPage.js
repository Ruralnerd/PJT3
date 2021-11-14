import StoryContainer from '../../containers/story/StoryContainer'
import StoryListContainer from '../../containers/story/StoryListContainer'
import StoryTemplate from '../../components/story/StoryTemplate'

const StoryListPage = () => {
  return (
    <>
      <StoryTemplate>
        <StoryContainer />
        <StoryListContainer />
      </StoryTemplate>
    </>
  )
}

export default StoryListPage
