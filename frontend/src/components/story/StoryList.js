/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
// import { Link } from 'react-router-dom'

const SaleWrapper = css``

/*
const SaleCard = css`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 2px 1px #9e9e9e;
  text-decoration: none;
`


const SaleTitle = css`
  flex: 1;
  padding: 0 4%;
  text-align: center;
  background-color: #f4f4f4;
`

const TitleText = css`
  overflow: hidden;
  text-overflow: clip;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 라인수
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`
*/
const SaleImage = css`
  width: 100%;
  height: 20vh;
  object-fit: cover;
  text-decoration: none;
`

const test = css`
  display: flex;
`

const StoryList = ({ storys }) => {
  return (
    <div>
      {storys && (
        <div css={SaleWrapper}>
          {storys.map((story) => (
            <div key={story.id} css={test}>
              <p>{story.title}</p>
              <img src={story.thumbnail_img} css={SaleImage} alt="" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default StoryList
