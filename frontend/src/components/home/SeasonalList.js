/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LinearProgressBar from '../common/LinearProgressBar'

const SeasonalWrapper = css`
  width: 100%;
  overflow: hidden;

  margin-bottom: 4rem;
`

const SeasonalBody = css`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  gap: 2%;
`

const SeasonalHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 24px 0;
`

const SeasonalItemImage = css`
  width: 10%;
`

const SeasonalList = ({ seasonalItems, loading }) => {
  if (loading || !seasonalItems) {
    return <LinearProgressBar />
  }

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5)
  }
  shuffle(seasonalItems)

  return (
    <div css={SeasonalWrapper}>
      <SeasonalHeader>지금이 제철인 상품</SeasonalHeader>
      <div css={SeasonalBody}>
        {seasonalItems.slice(0, 3).map((item) => (
          <Link key={item.id} to={`/market/${item.id}`}>
            <img css={SeasonalItemImage} src={item.thumbnail_img} alt="" />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default SeasonalList
