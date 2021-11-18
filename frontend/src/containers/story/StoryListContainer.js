import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStorys } from '../../modules/story'
import StoryList from '../../components/story/StoryList'

const StoryListContainer = () => {
  const dispatch = useDispatch()
  const { num, option, auth, storys, loading, error } = useSelector(
    ({ story, loading, auth }) => ({
      num: story.num,
      option: story.option,
      storys: story.storys,
      error: story.error,
      auth: auth.auth,
      loading: loading['story/GET_STORYS'],
    }),
  )

  useEffect(() => {
    dispatch(getStorys({ num, option }))
  }, [dispatch, num, option])

  return (
    <StoryList auth={auth} storys={storys} error={error} loading={loading} />
  )
}

export default StoryListContainer
