/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'

const BottomNavWrapper = css`
  background-color: white;
  position: fixed;
  width: 100%;
  height: 5rem;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border-top: 1px solid black;
`

const IconGroup = css`
  text-decoration: none;
  color: black;
`

const IconText = css`
  font-size: 0.8rem;
  margin: 0 auto;
`

const BottomNav = () => {
  const token = localStorage.getItem('token')

  return (
    <div css={BottomNavWrapper}>
      <div>
        <Link to="/" css={IconGroup}>
          <img src="/images/icon/home.svg" alt="" />
          <p css={IconText}>홈</p>
        </Link>
      </div>
      <div>
        <Link to="/search" css={IconGroup}>
          <img src="/images/icon/search.svg" alt="" />
          <p css={IconText}>검색</p>
        </Link>
      </div>
      <div>
        {token && (
          <Link to="/profile" css={IconGroup}>
            <img src="/images/icon/person.svg" alt="" />
            <p css={IconText}>내 정보</p>
          </Link>
        )}
        {!token && (
          <Link to="/login" css={IconGroup}>
            <img src="/images/icon/person.svg" alt="" />
            <p css={IconText}>내 정보</p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default BottomNav
