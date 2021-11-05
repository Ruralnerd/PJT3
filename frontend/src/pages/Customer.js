/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const category = css`
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;

  color: #000000;
`
const profile = css`
  height: 130px;
  display: flex;
  border: 3px solid red;
`
const profilePicture = css`
  width: 125px;
  height: 125px;
  object-fit: contain;
  border: 3px solid purple;
`
const profileContent = css`
  display: flex;
  flex-flow: column;
  border: 3px solid orange;
`
const register = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translate(-50%, 0);
  border: 3px solid green;
`
const registerButton = css`
  width: 200px;
  height: 40px;

  text-align: center;
  font-size: 20px;
  background-color: #bc6e3d;
  color: white;
  border: none;
  border-radius: 5px;
`

function Customer() {
  return (
    <div>
      <div>소비자 마이 페이지</div>
      <div css={category}>소비자 님의 프로필</div>
      <div css={profile}>
        <div css={profilePicture}>프사</div>
        <div css={profileContent}>
          <div>이름</div>
          <div>주소</div>
          <div>연락처</div>
        </div>
      </div>
      <div css={register}>
        <button css={registerButton}>판매자 등록하기</button>
      </div>
    </div>
  )
}
export default Customer
