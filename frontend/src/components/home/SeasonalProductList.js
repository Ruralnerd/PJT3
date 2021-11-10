/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const SeasonalProductWrapper = css`
  display: flex;
  justify-content: space-between;
  width: 95%;
  margin: 0 2%;
  gap: 2%;
`

const SeasonalProductImage = css`
  width: 100%;
  height: 100px;
`

const SeasonalProductList = ({ posts }) => {
  if (posts) {
    const shuffle = (array) => {
      array.sort(() => Math.random() - 0.5)
    }
    shuffle(posts)
    return (
      <div>
        <h3
          css={css`
            margin: 0 10% 0 0;
          `}
        >
          제철상품
        </h3>
        <div css={SeasonalProductWrapper}>
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/market/${post.id}`}>
              <img css={SeasonalProductImage} src={post.thumbnail_img} alt="" />
            </Link>
          ))}
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <p>로딩중입니다.</p>
      </div>
    )
  }
}
export default SeasonalProductList
