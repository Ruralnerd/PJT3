/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import SalesList from '../components/SalesList'
import StoryList from '../components/Story'

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

function Seller() {
  return (
    <div>
      <div>판매자 마이 페이지</div>
      <div css={category}>판매자 님의 프로필</div>
      <div css={profile}>
        <div css={profilePicture}>프사</div>
        <div css={profileContent}>
          <div>이름</div>
          <div>주소</div>
          <div>연락처</div>
        </div>
      </div>
      <div css={category}>판매자 님의 판매상품</div>
      <SalesList />
      <div css={category}>판매자 님의 이야기</div>
      <StoryList />
    </div>
  )
}
export default Seller
