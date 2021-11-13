import StoryContainer from '../containers/story/StoryContainer'
import StoryListContainer from '../containers/story/StoryListContainer'
import StoryTemplate from '../components/story/StoryTemplate'

const StoryPage = () => {
  return (
    <>
      <StoryTemplate>
        <StoryContainer />
        <StoryListContainer />
      </StoryTemplate>
    </>
  )
}

export default StoryPage
