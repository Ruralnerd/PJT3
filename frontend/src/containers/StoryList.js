/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const storyList = css`
  align-items: center;
  border: 3px solid green;
`
const story = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  height: 120px;
  border: 3px solid purple;
`
const storyText = css`
  border: 3px solid blue;
`

const title = css`
  display: flex;
  flex-wrap: wrap;
  margin-right: 100px;
  font-size: 20px;
`
const picture = css`
  right: 13px;
  min-width: 90px;
  min-height: 90px;
  position: absolute;
  object-fit: cover;
  border: 3px solid orange;
  border-radius: 5px;
`

function StoryList() {
  return (
    <div css={storyList}>
      <a href="/" css={story}>
        <div css={storyText}>
          <div css={title}>제목</div>
          <span>2021.11.02</span>
        </div>
        <div css={picture}>사진</div>
      </a>
      <hr />
      <a href="/" css={story}>
        <div css={storyText}>
          <div css={title}>제목</div>
          <div>2021.11.01</div>
        </div>
        <div css={picture}>사진</div>
      </a>
      <hr />
      <a href="/" css={story}>
        <div css={storyText}>
          <div css={title}>제목</div>
          <div>2021.10.31</div>
        </div>
        <div css={picture}>사진</div>
      </a>
      <hr />
    </div>
  )
}
export default StoryList
