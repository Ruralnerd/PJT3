/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

// const sizes = {
//   desktop: '1024px',
//   tablet: '768px',
//   mobile: '360px',
// }

/* 화면 전체 */
const StoryTemplateWrapper = css`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 4%;
`

const StoryTemplate = ({ children }) => {
  return (
    <div>
      <div css={StoryTemplateWrapper}>{children}</div>
    </div>
  )
}

export default StoryTemplate
