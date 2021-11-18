import { useEffect } from 'react'
import StoryDetail from '../../components/story/StoryDetail'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStory, getStory, initialize } from '../../modules/story'
import { withRouter } from 'react-router'

const StoryDetailContainer = ({ match, history }) => {
  const dispatch = useDispatch()

  const id = match.params.id

  const { story, user_id, error, loading } = useSelector(
    ({ story, auth, loading }) => ({
      story: story.story,
      error: story.error,
      user_id: auth.auth.id,
      loading: loading,
    }),
  )

  useEffect(() => {
    dispatch(getStory(id))
    return () => {
      dispatch(initialize())
    }
  }, [dispatch, id])

  const onDeleteStory = () => {
    dispatch(deleteStory(id))
    alert('스토리를 삭제했습니다.')
    history.push('/story')
  }

  return (
    <StoryDetail
      user_id={user_id}
      story={story}
      error={error}
      loading={loading}
      onDeleteStory={onDeleteStory}
    />
  )
}

export default withRouter(StoryDetailContainer)
