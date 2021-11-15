/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const FarmerStoryWrapper = css`
  padding: 2%;
  margin: 0 auto;

  h3 {
    margin-top: 0;
    margin-bottom: 2%;
  }
`

const FarmerStoryList = ({ storys }) => {
  const trueStorys = storys.filter((story) => story.thumbnail_img.length > 1)
  const story = trueStorys[Math.floor(Math.random() * trueStorys.length)]

  return (
    <div css={FarmerStoryWrapper}>
      <h3>농부이야기 리스트</h3>
      {story && (
        <div>
          <Link key={story.id} to={`/story/${story.id}`}>
            <img src={story.thumbnail_img} alt=""></img>
          </Link>
        </div>
      )}
    </div>
  )
}
export default FarmerStoryList
