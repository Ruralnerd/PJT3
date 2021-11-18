import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStorys } from '../../modules/story'
import StoryList from '../../components/story/StoryList'

const StoryListContainer = () => {
  const dispatch = useDispatch()
  const { storys, loading, error } = useSelector(({ story, loading }) => ({
    storys: story.storys,
    error: story.error,
    loading: loading['story/GET_STORYS'],
  }))

  useEffect(() => {
    dispatch(getStorys())
  }, [dispatch])

  return <StoryList storys={storys} error={error} loading={loading} />
}

export default StoryListContainer
