/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

const wrap = css`
  height: 100vh;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  section {
    width: 280px;
    height: 400px;
  }

  img {
    width: 100%;
  }
`

const formStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const Login = () => {
  const [value, setValue] = useState({
    email: '',
    password: '',
    showPassword: false,
  })

  return (
    <div css={wrap}>
      <section>
        <img src="/images/logo/logo_white_horizontal.png" alt="" />
        <div css={formStyle}>
          <TextField
            id="standard-error-helper-text"
            label="아이디"
            placeholder="아이디를 입력하세요"
            variant="standard"
          />
          <TextField
            id="standard-error-helper-text"
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            variant="standard"
          />
        </div>
      </section>
    </div>
  )
}

export default Login
