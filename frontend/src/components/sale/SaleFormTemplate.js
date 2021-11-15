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
const SaleFormTemplateWrapper = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${palette.gray[0]};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 80px;
  }
`

/* 로고를 포함한 투명한 박스 */
const SaleBox = css`
  width: 768px;

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

/* 에디터가 들어가는 하얀색 박스 */
const WhiteBox = css`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 1rem;
  width: 90%;
  background: white;
  border-radius: 4px;
  border: 1px solid ${palette.gray[3]};
`

const SaleFormTemplate = ({ children }) => {
  return (
    <div css={SaleFormTemplateWrapper}>
      <div css={SaleBox}>
        <Link to="/" className="logo-area">
          <img src="/images/logo/logo_white_horizontal.png" alt="" />
        </Link>
        <div css={WhiteBox}>{children}</div>
      </div>
    </div>
  )
}

export default SaleFormTemplate
