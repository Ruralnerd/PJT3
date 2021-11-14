import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStorys } from '../../modules/story'
import StoryList from '../../components/story/StoryList'

const StoryListContainer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getStorys())
  }, [dispatch])

  const { storys } = useSelector(({ story }) => ({ storys: story.storys }))

  return (
    <>
      <StoryList storys={storys} />
    </>
  )
}

export default StoryListContainer
