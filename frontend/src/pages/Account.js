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
const select = css`
  width: 305px;
  height: 54px;
  font-size: 20px;
  border-radius: 10px;
  font-weight: bold;
`
const input = css`
  width: 300px;
  height: 50px;
  font-size: 20px;
  border: 1px solid black;
  border-radius: 10px;
`

function Account() {
  const registeration = () => {
    console.log('등록')
  }
  return (
    <div>
      <div css={category}>판매계좌 등록</div>
      <br />
      <div>은행명</div>
      <select css={select}>
        <option value="">은행을 선택하세요.</option>
        <option value="">부산은행</option>
        <option value="">국민은행</option>
        <option value="">IBK 기업은행</option>
      </select>
      <br />
      <br />
      <div>계좌번호</div>
      <input type="text" css={input} placeholder="계좌번호를 입력하세요." />
      <div>
        <button onClick={registeration}>등록</button>
      </div>
    </div>
  )
}
export default Account
