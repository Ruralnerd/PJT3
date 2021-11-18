/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '../common/Button'
import { Grid } from '@mui/material'
import LinearProgressBar from '../common/LinearProgressBar'
import StoryListCard from '../common/StoryListCard'

const StoryListWrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
`

const StoryListButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
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
      <StoryListButtonWrapper>
        {auth.id !== null && auth.token !== null && (
          <Button cyan to="/sale">
            스토리 글 작성하기
          </Button>
        )}
      </StoryListButtonWrapper>
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
