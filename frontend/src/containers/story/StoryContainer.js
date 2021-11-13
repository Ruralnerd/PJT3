/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { writePost } from '../../modules/write'
import Button from '../../components/common/Button'
import styled from 'styled-components'

const StoryContainer = () => {
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
        <h4>다른 농장의 이야기들을 들어보세요.</h4>
        <Link to="/editor/story" onClick={createStory}>
          <CreateStoryButton>글쓰기</CreateStoryButton>
        </Link>
      </div>
    </>
  )
}

export default StoryContainer
