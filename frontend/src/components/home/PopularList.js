/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const PopularListWrapper = css`
  padding: 2%;
  margin: 0 auto;

  h3 {
    margin-top: 0;
    margin-bottom: 2%;
  }
`

const PopularItemWrapper = css`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  gap: 2%;
`

const PopularItemImage = css`
  width: 100%;
  height: 100%;
`

const PopularList = ({ popularItems }) => {
  if (popularItems) {
    const shuffle = (array) => {
      array.sort(() => Math.random() - 0.5)
    }
    shuffle(popularItems)
    return (
      <div css={PopularListWrapper}>
        <h3>핫한상품</h3>
        <div css={PopularItemWrapper}>
          {popularItems.slice(0, 3).map((item) => (
            <Link key={item.id} to={`/market/${item.id}`}>
              <img css={PopularItemImage} src={item.thumbnail_img} alt="" />
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
export default PopularList
