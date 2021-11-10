/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

/**
 * 스마트 에디터의 레이아웃을 담당하는 컴포넌트입니다.
 */
const sizes = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '360px',
}

/* 화면 전체 */
const EditorTemplateWrapper = ({ theme }) => css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${palette.gray[0]};
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 80px;
  }
`

/* 로고를 포함한 투명한 박스 */
const EditorBox = css`
  width: 1024px;

  @media (max-width: ${sizes.desktop}) {
    width: 100%;
  }
  @media (max-width: ${sizes.mobile}) {
    width: 100%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
`

const EditorTemplate = ({ type, theme }) => {
  return (
    <div css={EditorTemplateWrapper({ theme })}>
      <Link to="/" className="logo-area">
        <img src="/images/logo/logo_white_horizontal.png" alt="" />
      </Link>
      <div css={EditorBox}></div>
    </div>
  )
}

export default EditorTemplate
