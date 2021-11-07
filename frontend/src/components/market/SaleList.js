/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const SaleWrapper = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2%;
`

const SaleCard = css`
  display: flex;
  flex-direction: column;
  box-shadow: 1px 1px 2px 1px #9e9e9e;
  text-decoration: none;
`

const SaleImage = css`
  width: 100%;
  height: 20vh;
  object-fit: cover;
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
  -webkit-line-clamp: 1; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`

const SaleList = ({ loadingPosts, posts }) => {
  return (
    <div>
      {loadingPosts && '로딩 중...'}
      {!loadingPosts && posts && (
        <div css={SaleWrapper}>
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/market/${post.id}`}
              css={css`
                text-decoration: none;
                color: black;
              `}
            >
              <div css={SaleCard}>
                <img src={post.thumbnail_img} alt="" css={SaleImage} />
                <div css={SaleTitle}>
                  <p css={TitleText}>{post.title}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SaleList
