/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import LinearProgressBar from '../common/LinearProgressBar'

const PopularWrapper = css`
  width: 100%;
  overflow: hidden;
  margin-bottom: 4rem;
`

const PopularBody = css`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  gap: 2%;
`

const PopularHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 24px 0;
`

const PopularItemImage = css`
  width: 100%;
  height: 100%;
`

const PopularList = ({ popularItems, loading }) => {
  if (loading || !popularItems) {
    return <LinearProgressBar />
  }

  const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5)
  }
  shuffle(popularItems)

  return (
    <div css={PopularWrapper}>
      <PopularHeader>인기가 많은 상품</PopularHeader>
      <div css={PopularBody}>
        {popularItems.slice(0, 3).map((item) => (
          <Link key={item.id} to={`/market/${item.id}`}>
            <img css={PopularItemImage} src={item.thumbnail_img} alt="" />
          </Link>
        ))}
      </div>
    </div>
  )
}
export default PopularList
