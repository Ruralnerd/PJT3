/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { postStory } from '../../modules/story'
import Button from '../../components/common/Button'

const StoryContainer = () => {
  const dispatch = useDispatch()

  const title = 'blank'

  const createStory = () => {
    dispatch(postStory({ title }))
  }

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
          <Button>글쓰기</Button>
        </Link>
      </div>
    </>
  )
}

export default StoryContainer
