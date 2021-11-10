/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

const FooterWrapper = css`
  color: white;
  text-align: center;
  background: ${palette.orange[5]};
  padding: 0;
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
  margin-top: 0;
  padding-bottom: 1rem;
`

const Blank = css`
  padding: 7% 0;
`

const Footer = () => {
  return (
    <div>
      <div css={FooterWrapper}>
        <div css={FooterTop}>
          <Link to="/" css={LinkText}>
            <p>고객센터</p>
          </Link>
          <p>|</p>
          <Link to="/" css={LinkText}>
            <p>공지사항</p>
          </Link>
          <p>|</p>
          <Link to="/" css={LinkText}>
            <p>문의하기</p>
          </Link>
        </div>
        <p css={FooterBottom}>copyright 농사직걸</p>
      </div>
      <div css={Blank}></div>
    </div>
  )
}

export default Footer
