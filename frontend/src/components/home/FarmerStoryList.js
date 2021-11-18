/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import StoryCard from '../common/StoryCard'
import { Grid } from '@mui/material'
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

  .sub-header {
    font-weight: 400;
    font-size: 16px;
    color: ${palette.gray[7]};
  }
`

const FarmerStoryBody = styled.div`
  padding: 10px 0;
`

const FarmerStoryList = ({ storys, loading }) => {
  if (loading || !storys) {
    return null
  }
  return (
    <FarmerStoryWrapper>
      <FarmerStoryHeader>
        농사직설 스케치
        <div className="sub-header">농부들의 생생한 이야기를 들어보세요.</div>
      </FarmerStoryHeader>
      <FarmerStoryBody>
        <Grid container spacing={2}>
          {storys.map((story) => (
            <Grid item xs={12} md={6} key={story.id}>
              <StoryCard story={story} />
            </Grid>
          ))}
          <Grid item xs={12} md={6}>
            <Link to="/farm">
              <StoryCard type="story" />
            </Link>
          </Grid>
        </Grid>
      </FarmerStoryBody>
    </FarmerStoryWrapper>
  )
}

export default FarmerStoryList
