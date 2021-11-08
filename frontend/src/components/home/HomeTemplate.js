/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

/* 화면 전체 */
const HomeWrapper = css`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 0 3%;
`

const HomeTemplate = ({ children }) => {
  return (
    <div>
      <div css={HomeWrapper}>{children}</div>
    </div>
  )
}

export default HomeTemplate
