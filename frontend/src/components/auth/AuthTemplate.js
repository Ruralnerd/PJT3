/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

/**
 * 회원가입/로그인 페이지의 레이아웃을 담당하는 컴포넌트입니다.
 */
const sizes = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '360px',
}

/* 화면 전체 */
const AuthTemplateWrapper = css`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: ${palette.gray[0]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* Mui Global Class*/
  .MuiFormControl-root {
    margin: 0;
    width: 100%;
    justify-content: center;
  }
`

/* 로고를 포함한 투명한 박스 */
const AuthBox = css`
  width: 480px;

  @media (max-width: ${sizes.desktop}) {
    width: 100%;
  }
  @media (max-width: ${sizes.mobile}) {
    width: 100%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 160px;
  }
`

const WhiteBox = css`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 90%;
  background: white;
  border-radius: 4px;
  border: 1px solid ${palette.gray[3]};
`

const AuthTemplate = ({ children }) => {
  return (
    <div css={AuthTemplateWrapper}>
      <div css={AuthBox}>
        <Link to="/" className="logo-area">
          <img src="/images/logo/logo_white_horizontal.png" alt="" />
        </Link>
        <div css={WhiteBox}>{children}</div>
      </div>
    </div>
  )
}

export default AuthTemplate
