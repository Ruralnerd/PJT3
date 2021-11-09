/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const HotProductWrapper = css`
  display: flex;
  width: 95%;
  margin: 0 2%;
  gap: 2%;
`

const HotProductImage = css`
  width: 100%;
  height: 80%;
`

const HotProductList = ({ posts }) => {
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
          핫한상품
        </h3>
        <div css={HotProductWrapper}>
          {posts.slice(0, 3).map((post) => (
            <Link key={post.id} to={`/market/${post.id}`}>
              <img css={HotProductImage} src={post.thumbnail_img} alt="" />
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
export default HotProductList
