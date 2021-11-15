/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SearchIcon from '@mui/icons-material/Search'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'

const BottomNavWrapper = css`
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border: 1px solid black;
`

const IconGroup = css`
  text-decoration: none;
  color: black;
`

const Icon = css`
  font-size: 3rem;
`

const IconText = css`
  font-size: 0.8rem;
  margin: 0 auto;
`

const BottomNav = () => {
  return (
    <div css={BottomNavWrapper}>
      <div>
        <Link to="/" css={IconGroup}>
          <HomeOutlinedIcon css={Icon}></HomeOutlinedIcon>
          <p css={IconText}>홈</p>
        </Link>
      </div>
      <div>
        <Link to="/search" css={IconGroup}>
          <SearchIcon css={Icon}></SearchIcon>
          <p css={IconText}>검색</p>
        </Link>
      </div>
      <div>
        <Link to="/profile" css={IconGroup}>
          <PermIdentityOutlinedIcon css={Icon}></PermIdentityOutlinedIcon>
          <p css={IconText}>내 정보</p>
        </Link>
      </div>
    </div>
  )
}

export default BottomNav
