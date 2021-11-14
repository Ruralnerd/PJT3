/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

/**
 * 스마트 에디터의 레이아웃을 담당하는 컴포넌트입니다.
 */
// const sizes = {
//   desktop: '1024px',
//   tablet: '768px',
//   mobile: '360px',
// }

/* 화면 전체 */
const StoryEditorTemplateWrapper = css`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: 4%;
`

const StoryEditorTemplate = ({ children }) => {
  return (
    <>
      <div css={StoryEditorTemplateWrapper}>{children}</div>
    </>
  )
}

export default StoryEditorTemplate
