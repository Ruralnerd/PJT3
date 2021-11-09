/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'
import { useLocation } from 'react-router-dom'

const TopNavWrapper = css`
  display: flex;
  background: ${palette.orange[5]};
  justify-content: space-evenly;
  align-items: center;
  color: white;
  font-size: 1.2em;
  height: 6vh;
`

const Logo = css`
  display: block;
  width: 20%;
  margin: 0 auto;
`

const LinkText = css`
  text-decoration: none;
  color: white;
`

const TopNav = () => {
  const location = useLocation()
  console.log(location.pathname)
  return (
    <div>
      <Link to="/">
        <img
          src="/images/logo/logo_white_horizontal.png"
          alt="로고"
          css={Logo}
        />
      </Link>
      <div css={TopNavWrapper}>
        <Link to="/market" css={LinkText}>
          장터
        </Link>
        <Link to="/story" css={LinkText}>
          이야기
        </Link>
        <Link to="/farm" css={LinkText}>
          농장
        </Link>
      </div>
    </div>
  )
}

export default TopNav
