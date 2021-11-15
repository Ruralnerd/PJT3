/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

const FooterWrapper = css`
  color: white;
  text-align: center;
  background-color: ${palette.yellow[9]};
  padding: 0.5rem;
`

const FooterTop = css`
  display: flex;
  justify-content: space-evenly;
`

const LinkText = css`
  text-decoration: none;
  color: white;
`

const FooterBottom = css`
  margin-top: 0.5rem;
  font-weight: 200;
`

const Blank = css`
  padding: 7% 0;
`

const Footer = () => {
  return (
    <div css={FooterWrapper}>
      <div css={FooterTop}>
        <Link to="/" css={LinkText}>
          <div>고객센터</div>
        </Link>
        <div>|</div>
        <Link to="/" css={LinkText}>
          <div>공지사항</div>
        </Link>
        <div>|</div>
        <Link to="/" css={LinkText}>
          <div>문의하기</div>
        </Link>
      </div>
      <div css={FooterBottom}>Copyright© D201 All rights reserved.</div>
    </div>
  )
}

export default Footer
