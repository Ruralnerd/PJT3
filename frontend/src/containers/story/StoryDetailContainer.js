import { useEffect } from 'react'
import StoryDetail from '../../components/story/StoryDetail'
import { useDispatch, useSelector } from 'react-redux'
import { getStory } from '../../modules/story'

const StoryDetailContainer = ({ match }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getStory(match.params.id))
    return () => {}
  }, [dispatch, match.params.id])
  const { story } = useSelector(({ story }) => ({ story: story.story }))

  return (
    <>
      <StoryDetail story={story} />
    </>
  )
}

export default StoryDetailContainer
