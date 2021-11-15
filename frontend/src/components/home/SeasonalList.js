/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const SeasonalListWrapper = css`
  padding: 2%;
  margin: 0 auto;

  h3 {
    margin-top: 0;
    margin-bottom: 2%;
  }
`

const SeasonalItemWrapper = css`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  gap: 2%;
`

const SeasonalItemImage = css`
  width: 100%;
  height: 100%;
`

const SeasonalList = ({ seasonalItems }) => {
  if (seasonalItems) {
    const shuffle = (array) => {
      array.sort(() => Math.random() - 0.5)
    }
    shuffle(seasonalItems)
    return (
      <div css={SeasonalListWrapper}>
        <h3>요즘 뜨는 상품</h3>
        <div css={SeasonalItemWrapper}>
          {seasonalItems.slice(0, 3).map((item) => (
            <Link key={item.id} to={`/market/${item.id}`}>
              <img css={SeasonalItemImage} src={item.thumbnail_img} alt="" />
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
export default SeasonalList
