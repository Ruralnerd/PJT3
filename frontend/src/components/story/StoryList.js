/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const StoryList = ({ storys }) => {
  const trueStorys = storys.filter((story) => story.thumbnail_img.length > 1)

  return (
    <div>
      {trueStorys && (
        <div
          css={css`
            display: flex;
            flex-wrap: wrap;
            gap: 2%;
          `}
        >
          {trueStorys.map((story) => (
            <Link key={story.id} to={`/story/${story.id}`}>
              <img src={story.thumbnail_img} alt=""></img>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default StoryList
