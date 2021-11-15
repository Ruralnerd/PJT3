/** @jsxImportSource @emotion/react */

import styled, { css } from 'styled-components'
// import { css } from '@emotion/react'
import Button from '../common/Button'
import { Link } from 'react-router-dom'

const HeaderWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin: 2% 10%; */
`

const InfoWrapper = css`
  display: flex;
  flex-wrap: wrap;
  gap: 2%;
`

const ProfileImage = css`
  width: 50%;
`

const SaleImage = css`
  width: 50%;
`
const StoryImage = css`
  width: 50%;
`

const LogoutButton = styled(Button)``

const ProfileForm = ({ userData, onLogout }) => {
  return (
    <>
      {userData && (
        <div>
          <div css={HeaderWrapper}>
            <h2>{userData.nickname}님의 프로필</h2>
            <LogoutButton onClick={onLogout}>로그아웃</LogoutButton>
          </div>

          <div css={InfoWrapper}>
            <img css={ProfileImage} src={userData.profile_img} alt="" />
            <div>
              <p>이메일 : {userData.email}</p>
              <p>전화번호 : {userData.phone}</p>
              <p>주소 :{userData.address}</p>
            </div>
          </div>
          <div>
            <h2>{userData.nickname}님의 판매상품</h2>
            <div
              css={css`
                display: flex;
              `}
            >
              {userData.markets &&
                userData.markets.map((item) => (
                  <div key={item.id}>
                    <Link to={`/market/${item.id}`}>
                      <img css={SaleImage} src={item.thumbnail_img} alt="" />
                    </Link>
                    <p>{item.title}</p>
                  </div>
                ))}
            </div>
            <div>
              <h2>{userData.nickname}님의 이야기</h2>
              <div
                css={css`
                  display: flex;
                `}
              >
                {userData.storys &&
                  userData.storys.map((story) => (
                    <div key={story.id}>
                      <Link to={`/storys/${story.id}`}>
                        <img
                          css={StoryImage}
                          src={story.thumbnail_img}
                          alt=""
                        />
                      </Link>
                      <p>{story.title}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <Link to="/profile/update">
            <Button>내 정보 수정</Button>
          </Link> */}
    </>
  )
}
export default ProfileForm
