/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const LinkText = css`
  text-decoration: none;
  color: white;
`

function Footer() {
  return (
    <Router>
      <div
        css={css`
          color: white;
          text-align: center;
          background-color: #bc6e3d;
          padding: 0;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-evenly;
          `}
        >
          <Link to="/" css={[LinkText]}>
            <p>고객센터</p>
          </Link>
          <p>|</p>
          <Link to="/" css={[LinkText]}>
            <p>공지사항</p>
          </Link>
          <p>|</p>
          <Link to="/" css={[LinkText]}>
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
    </Router>
  )
}

export default Footer
