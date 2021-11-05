/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const wrap = css`
  display: flex;
  background-color: #bc6e3d;
  justify-content: space-evenly;
  align-items: center;
  color: white;
  font-size: 1.2em;
  height: 6vh;
`

const img = css`
  display: block;
  width: 20%;
  margin: 0 auto;
`

const linkText = css`
  text-decoration: none;
  color: white;
`

const TopNav = () => {
  return (
    <div>
      <Link to="/">
        <img src="img/logo.png" alt="" css={img} />
      </Link>
      <div css={wrap}>
        <Link to="/market" css={[linkText]}>
          장터
        </Link>
        <Link to="/story" css={[linkText]}>
          이야기
        </Link>
        <Link to="/farm" css={[linkText]}>
          농장
        </Link>
      </div>
    </div>
  )
}

export default TopNav
