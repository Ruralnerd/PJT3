/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box } from '@mui/system'
import {
  FormControl,
  Input,
  TextField,
  InputAdornment,
  InputLabel,
} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { ThemeProvider, createTheme } from '@mui/material'
import Button from '../common/Button'
import palette from '../../lib/styles/palette'
import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * 회원가입 또는 로그인 폼을 보여 줍니다.
 */
const AuthFormWrapper = css``

const Footer = css`
  margin-top: 1rem;
  text-align: right;
  font-size: 0.875rem;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`

const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR'],
  },
})

const textMap = {
  login: '로그인',
  register: '회원가입',
}

const AuthForm = ({ type, form, onChange, onSubmit }) => {
  const text = textMap[type]
  const [state, setState] = useState({
    showPassword: false,
  })

  const handleClickShowPassword = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    })
  }

  return (
    <div css={AuthFormWrapper}>
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
          }}
        >
          <div className="formHeader">
            {type === 'login' ? '이메일로 로그인' : '회원가입'}
          </div>
          <form onSubmit={onSubmit}>
            <TextField
              id="text-email"
              name="email"
              label="이메일"
              variant="standard"
              onChange={onChange}
              value={form.email}
            />
            <FormControl
              sx={{ m: 1, width: '25ch', fontFamily: 'Noto Sans KR' }}
              variant="standard"
            >
              <InputLabel htmlFor="text-password">비밀번호</InputLabel>
              <Input
                id="text-password"
                name="password"
                label="비밀번호"
                type={state.showPassword ? 'text' : 'password'}
                variant="standard"
                value={form.password}
                onChange={onChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                    >
                      {state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {/* 회원가입일 경우 추가로 입력하는 Input */}
            {type === 'register' && (
              <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                <InputLabel htmlFor="text-password">비밀번호 확인</InputLabel>
                <Input
                  id="text-passwordConfirm"
                  name="passwordConfirm"
                  label="비밀번호 확인"
                  type={state.showPassword ? 'text' : 'password'}
                  variant="standard"
                  value={form.passwordConfirm}
                  onChange={onChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            )}

            <div css={Footer}>
              {type === 'login' ? (
                <Link to="/register">회원가입</Link>
              ) : (
                <Link to="/login">로그인</Link>
              )}
            </div>
            <Button orange fullWidth>
              {text}
            </Button>
          </form>
        </Box>
      </ThemeProvider>
    </div>
  )
}

export default AuthForm
