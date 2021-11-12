import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import StoryList from '../../components/story/StoryList'
import { getStorys } from '../../modules/story'
import { Link } from 'react-router-dom'

const StoryContainer = ({ getStorys, storys }) => {
  useEffect(() => {
    getStorys()
    return () => {
      // unMount
    }
  }, [getStorys])

  return (
    <div>
      <p>하하 스토리 컨테이너</p>
      <Link to="/editor/story">
        <p>글쓰기</p>
      </Link>
      <StoryList storys={storys} />
    </div>
  )
}

export default connect(
  ({ story }) => ({
    storys: story.storys,
  }),
  {
    getStorys,
  },
)(StoryContainer)
