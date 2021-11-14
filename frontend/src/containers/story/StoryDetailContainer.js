import { useEffect } from 'react'
import StoryDetail from '../../components/story/StoryDetail'
import { useDispatch, useSelector } from 'react-redux'
import { getStory, initialize } from '../../modules/story'

const StoryDetailContainer = ({ match }) => {
  const dispatch = useDispatch()

  const id = match.params.id

  const { story } = useSelector(({ story }) => ({ story: story.story }))

  useEffect(() => {
    dispatch(getStory(id))
    return () => {
      dispatch(initialize())
    }
  }, [dispatch, id])

  return (
    <>
      <StoryDetail story={story} />
    </>
  )
}

export default StoryDetailContainer
