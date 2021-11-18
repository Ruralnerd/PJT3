/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import Button from '../common/Button'
import { Grid } from '@mui/material'
import LinearProgressBar from '../common/LinearProgressBar'
import StoryListCard from '../common/StoryListCard'

const StoryListWrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
`

const StoryListBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  div {
    font-size: 16px;
  }
`

const StoryListBody = styled.div`
  padding: 10px 20px;
`

const StoryList = ({ auth, storys, error, loading }) => {
  if (error) {
    return <div>오류 발생!</div>
  }
  if (loading || !storys) {
    return <LinearProgressBar />
  }
  return (
    <StoryListWrapper>
      <StoryListBanner>
        <div>카드를 열어 농부들의 생생한 이야기를 들어보세요!</div>
        {auth.id !== null && auth.token !== null && (
          <Button cyan to="/editor/story">
            스토리 글 작성하기
          </Button>
        )}
      </StoryListBanner>
      <StoryListBody>
        <Grid container spacing={2}>
          {storys.map((story) => (
            <Grid item xs={12} sm={6} md={4} key={story.id}>
              <StoryListCard story={story} />
            </Grid>
          ))}
        </Grid>
      </StoryListBody>
    </StoryListWrapper>
  )
}

export default StoryList
