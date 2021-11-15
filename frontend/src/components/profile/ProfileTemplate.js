/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

// const sizes = {
//   desktop: '1024px',
//   tablet: '768px',
//   mobile: '360px',
// }

/* 화면 전체 */
const Wrapper = css`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 5%;
`

const ProfileTemplate = ({ children }) => {
  return (
    <div>
      <div css={Wrapper}>{children}</div>
    </div>
  )
}

export default ProfileTemplate
