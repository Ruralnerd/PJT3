/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

const salesList = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border: 3px solid green;
`
const product = css`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  width: 120px;
  height: 120px;
  border: 3px solid purple;
`

function SalesList() {
  return (
    <div css={salesList}>
      <div css={product}>1</div>
      <div css={product}>2</div>
      <div css={product}>3</div>
      <div css={product}>4</div>
    </div>
  )
}
export default SalesList
