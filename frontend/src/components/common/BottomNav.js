/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SearchIcon from '@mui/icons-material/Search'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'

const wrap = css`
  display: flex;
  justify-content: space-evenly;
  text-align: center;
  border: 1px solid black;
`

const iconGroup = css`
  text-decoration: none;
  color: black;
`

const icon = css`
  font-size: 3rem;
`

const iconText = css`
  font-size: 0.8rem;
  margin: 0 auto;
`

const BottomNav = () => {
  return (
    <div css={wrap}>
      <div>
        <Link to="/" css={[iconGroup]}>
          <HomeOutlinedIcon css={[icon]}></HomeOutlinedIcon>
          <p css={[iconText]}>홈</p>
        </Link>
      </div>
      <div>
        <Link to="/search" css={[iconGroup]}>
          <SearchIcon css={[icon]}></SearchIcon>
          <p css={[iconText]}>검색</p>
        </Link>
      </div>
      <div>
        <Link to="/profile" css={[iconGroup]}>
          <PermIdentityOutlinedIcon css={[icon]}></PermIdentityOutlinedIcon>
          <p css={[iconText]}>내 정보</p>
        </Link>
      </div>
    </div>
  )
}

export default BottomNav
