/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import Button from '../common/Button'
import { Link, withRouter } from 'react-router-dom'
import LinearProgressBar from '../common/LinearProgressBar'
import palette from '../../lib/styles/palette'
import { Grid } from '@mui/material'
import SaleListCard from '../common/SaleListCard'
import StoryListCard from '../common/StoryListCard'

const ProfileWrapper = styled.div`
  width: 100%;
  padding: 0.5rem;
`

const ProfileBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
  margin-bottom: 1rem;
  width: 100%;

  div {
    font-size: 16px;
  }

  .ProfileBannerButtons {
    display: flex;
    justify-content: space-around;

    button {
      margin: 5px;
    }

    a {
      margin: 5px;
    }
  }
`

const ProfileBody = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const ProfileInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`

const ProfileInfoImage = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 100%;
`

const ProfileInfoText = styled.div`
  border-radius: 4px;
  border: 1px solid ${palette.gray[2]};
  padding: 20px;
`

const ProfileBadge = styled.div`
  display: flex;
  justify-content: center;
  top: 10px;
  left: 10px;
  border-radius: 4px;
  padding: 2px;
  width: 4rem;
  background: #d33939;
  color: white;
  font-size: 1rem;
`

const ProfileForm = ({ userData, onLogout, auth, loading, error }) => {
  if (error) {
    return <div>오류 발생!</div>
  }
  if (loading || !userData || !auth) {
    return <LinearProgressBar />
  }
  const current_user = auth.id
  const {
    id,
    storys,
    markets,
    email,
    nickname,
    address,
    phone,
    profile_img,
    is_seller,
    ac_number,
    ac_bank,
  } = userData
  return (
    <ProfileWrapper>
      <ProfileBanner>
        <h2>{nickname}님의 프로필</h2>
        {current_user && id.toString() === current_user.toString() && (
          <div className="ProfileBannerButtons">
            <Button to="/profile/update">내정보 수정</Button>
            <Button cyan to="/profile/account">
              판매자 등록
            </Button>
            <Button red onClick={onLogout}>
              로그아웃
            </Button>
          </div>
        )}
      </ProfileBanner>
      <ProfileBody>
        <ProfileInfo>
          <ProfileInfoImage src={`${profile_img}`} />
          <ProfileInfoText>
            <div>이메일: {email}</div>
            <div>
              전화번호: {phone === null ? '등록되지 않았습니다.' : phone}
            </div>
            <div>
              주소: {address === null ? '등록되지 않았습니다.' : address}
            </div>
            <div>
              등록은행: {ac_bank === null ? '등록되지 않았습니다.' : ac_bank}
            </div>
            <div>
              계좌번호:{' '}
              {ac_number === null ? '등록되지 않았습니다.' : ac_number}
            </div>
            <hr />
            {!is_seller && <ProfileBadge>판매자</ProfileBadge>}
          </ProfileInfoText>
        </ProfileInfo>
        {markets.length !== 0 && (
          <>
            <h3>{nickname}님의 상품</h3>
            <Grid container spacing={2}>
              {markets.map((sale) => (
                <Grid item xs={12} sm={6} md={4} key={sale.id}>
                  <SaleListCard sale={sale} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {storys.length !== 0 && (
          <>
            <h3>{nickname}님의 스토리</h3>
            <Grid container spacing={2}>
              {storys.map((story) => (
                <Grid item xs={12} sm={6} md={4} key={story.id}>
                  <StoryListCard story={story} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </ProfileBody>
    </ProfileWrapper>
  )
}
export default withRouter(ProfileForm)
