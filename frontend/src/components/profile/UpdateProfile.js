/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const ProfileUser = css`
  display: flex;
  border: 3px solid blue;
`
const ProfileUserImg = css`
  border: 3px solid red;
`
const ProfileUserData = css`
  border: 3px solid green;
`

const Profile = ({ loadingProfile, userData }) => {
  const ProfileUpdateButton = () => {}
  return (
    <div>
      {loadingProfile && '로딩 중...'}
      {!loadingProfile && userData && (
        <div>
          <div>구매자님의 프로필</div>
          <div css={ProfileUser}>
            <div css={ProfileUserImg}>{userData.profile_img}</div>
            <div css={ProfileUserData}>
              <div>이름:{userData.nickname}</div>
              <div>주소:{userData.address}</div>
              <div>연락처:{userData.phone}</div>
            </div>
          </div>
          <button onClick={ProfileUpdateButton}>수정 완료</button>
        </div>
      )}
    </div>
  )
}

export default Profile
