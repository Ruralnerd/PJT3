/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { BrowserRouter as Router, Link } from 'react-router-dom'

const LinkText = css`
  text-decoration: none;
  color: white;
`

function TopNav() {
  return (
    <Router>
      <div>
        <Link to="/">
          <img
            src="img/logo.png"
            alt=""
            css={css`
              display: block;
              width: 20%;
              margin: 0 auto;
            `}
          />
        </Link>
        <div
          css={css`
            display: flex;
            background-color: #bc6e3d;
            justify-content: space-evenly;
            align-items: center;
            color: white;
            font-size: 1.2em;
            height: 6vh;
          `}
        >
          <Link to="/" css={[LinkText]}>
            장터
          </Link>
          <Link to="/story" css={[LinkText]}>
            이야기
          </Link>
          <Link to="/farm" css={[LinkText]}>
            농장
          </Link>
        </div>
      </div>
    </Router>
  )
}

export default TopNav
