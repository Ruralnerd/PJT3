/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import { Grid } from '@mui/material'
import LinearProgressBar from '../common/LinearProgressBar'
import ProfileListCard from '../common/ProfileListCard'

const ProfileListWrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
`

const ProfileListBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  div {
    font-size: 16px;
  }
`

const ProfileListBody = styled.div`
  padding: 10px 20px;
`

const ProfileList = ({ profiles, error, loading }) => {
  if (error) {
    return <div>오류 발생!</div>
  }
  if (loading || !profiles) {
    return <LinearProgressBar />
  }
  return (
    <ProfileListWrapper>
      <ProfileListBody>
        <ProfileListBanner>
          궁금하신 농부님의 카드를 열어주세요!
        </ProfileListBanner>
        <Grid container spacing={2}>
          {profiles.map((profile) => (
            <Grid item xs={12} sm={6} md={4} key={profile.id}>
              <ProfileListCard profile={profile} />
            </Grid>
          ))}
        </Grid>
      </ProfileListBody>
    </ProfileListWrapper>
  )
}

export default ProfileList
