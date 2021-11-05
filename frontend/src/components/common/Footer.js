/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const FooterWrapper = css`
  color: white;
  text-align: center;
  background-color: #bc6e3d;
  padding: 0;
`

const LinkText = css`
  text-decoration: none;
  color: white;
`

const Footer = () => {
  return (
    <div css={FooterWrapper}>
      <div
        css={css`
          display: flex;
          justify-content: space-evenly;
        `}
      >
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
      <p
        css={css`
          margin-top: 0;
          padding-bottom: 1rem;
        `}
      >
        copyright 농사직걸
      </p>
    </div>
  )
}

export default Footer
