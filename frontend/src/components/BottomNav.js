/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'

const Icon = css`
  font-size: 3rem;
`

const IconText = css`
  font-size: 0.8rem;
  margin: 0 auto;
`
const IconGroup = css`
  text-decoration: none;
  color: black;
`

function BottomNav() {
  return (
    <Router>
      <div
        css={css`
          display: flex;
          justify-content: space-evenly;
          text-align: center;
        `}
      >
        <div>
          <Link to="/" css={[IconGroup]}>
            <HomeOutlinedIcon css={[Icon]}></HomeOutlinedIcon>
            <p css={[IconText]}>홈</p>
          </Link>
        </div>
        <div>
          <Link to="/search" css={[IconGroup]}>
            <SearchOutlinedIcon css={[Icon]}></SearchOutlinedIcon>
            <p css={[IconText]}>검색</p>
          </Link>
        </div>
        <div>
          <Link to="/profile" css={[IconGroup]}>
            <PermIdentityOutlinedIcon css={[Icon]}></PermIdentityOutlinedIcon>
            <p css={[IconText]}>내 정보</p>
          </Link>
        </div>
      </div>
    </Router>
  )
}

export default BottomNav
