/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const FarmerStoryWrapper = styled.div`
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const FarmerStoryHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 24px 0;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`

const FarmerStoryList = ({ storys, loading }) => {
  if (loading || !storys || !storys[0]) {
    return null
  }
  return (
    <FarmerStoryWrapper>
      <FarmerStoryHeader>농사직설 스케치</FarmerStoryHeader>
      <div>
        <Link key={storys[0].id} to={`/story/${storys[0].id}`}>
          <img src={storys[0].thumbnail_img} alt=""></img>
        </Link>
      </div>
    </FarmerStoryWrapper>
  )
}
export default FarmerStoryList
