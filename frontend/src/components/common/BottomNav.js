/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

const BottomNavWrapper = css`
  background-color: white;
  position: fixed;
  width: 100%;
  height: 5rem;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  border-top: 1px solid ${palette.gray[5]};
  z-index: 9;
`

const IconGroup = css`
  color: black;
`

const IconText = css`
  font-size: 0.5rem;
  margin: 0 auto;
`

const BottomNav = () => {
  const token = localStorage.getItem('token')
  const id = localStorage.getItem('user_id')

  return (
    <div css={BottomNavWrapper}>
      <div>
        <Link to="/" css={IconGroup}>
          <img src="/images/icon/home.svg" alt="" />
          <div css={IconText}>홈</div>
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
          <Link to={`/profile/${id}`} css={IconGroup}>
            <img src="/images/icon/person.svg" alt="" />
            <div css={IconText}>내 정보</div>
          </Link>
        )}
        {!token && (
          <Link to="/login" css={IconGroup}>
            <img src="/images/icon/person.svg" alt="" />
            <div css={IconText}>내 정보</div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default BottomNav
