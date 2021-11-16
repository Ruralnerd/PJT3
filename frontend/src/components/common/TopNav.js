/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'
import { useLocation } from 'react-router-dom'

const TopNavWrapper = css`
  display: flex;
  background-color: ${palette.yellow[9]};
  justify-content: space-evenly;
  align-items: center;
  color: white;
  font-size: 1.2em;
  width: 100%;
  height: 2.5rem;
`

const Logo = css`
  display: block;
  height: 3rem;
  margin: 0 auto;
`

const LinkText = css`
  text-decoration: none;
  color: white;
`

/*
TodoList

const isActive = css`
  color: red;
`
 */
const TopNav = () => {
  // TodoList
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
        <Link to="/market" css={LinkText} id="market">
          장터
        </Link>
        <Link to="/story" css={LinkText} id="stroy">
          이야기
        </Link>
        <Link to="/farm" css={LinkText} id="farm">
          농장
        </Link>
      </div>
    </div>
  )
}

export default TopNav
