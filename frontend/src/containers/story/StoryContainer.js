/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect } from 'react'
import { connect } from 'react-redux'
import StoryList from '../../components/story/StoryList'
import { getStorys } from '../../modules/story'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { writePost } from '../../modules/write'
import Button from '../../components/common/Button'
import styled from 'styled-components'

const StoryContainer = ({ getStorys, storys }) => {
  useEffect(() => {
    getStorys()
    return () => {
      // unMount
    }
  }, [getStorys])

  const dispatch = useDispatch()

  const title = 'blank'

  const createStory = () => {
    dispatch(writePost({ title }))
  }

  const CreateStoryButton = styled(Button)`
    padding: 0.5rem;
  `

  const StoryWrapper = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `

  return (
    <>
      <div css={StoryWrapper}>
        <h3>다른 농장의 이야기들을 들어보세요.</h3>
        <Link to="/editor/story" onClick={createStory}>
          <CreateStoryButton>글쓰기</CreateStoryButton>
        </Link>
      </div>
      <StoryList storys={storys} />
    </>
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
