/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import Spinner from '../common/Spinner'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import Button from '../common/Button'
import palette from '../../lib/styles/palette'
import LinearProgressBar from '../common/LinearProgressBar'

const sizes = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '360px',
}

const ProfileWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 15rem);
`

const ProfileBody = styled.div`
  width: 100%;
  height: calc(100vh - 15rem);
  padding: 10px 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const ProfileBox = styled.div`
  width: 480px;

  @media (max-width: ${sizes.desktop}) {
    width: 100%;
  }
  @media (max-width: ${sizes.mobile}) {
    width: 100%;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${palette.gray[4]};
  padding: 40px;
  border-radius: 8px;
`

const ProfileUpdateForm = ({ form, onChange, onSubmit, error, loading }) => {
  if (error) {
    return <div>오류 발생!</div>
  }
  if (loading || !form) {
    return <LinearProgressBar />
  }
  return (
    <ProfileWrapper>
      <ProfileBody>
        <h1>프로필 수정</h1>
        <form onSubmit={onSubmit}>
          <ProfileBox>
            <Box
              sx={{
                display: 'grid',
                gap: 2,
              }}
            >
              <TextField
                id="text-nickname"
                name="nickname"
                label="닉네임"
                variant="standard"
                onChange={onChange}
                // 그냥 value하면 빈값일때 에러 출력(로직에 문제는 없긴 함)
                defaultValue={form.nickname}
              />
              <TextField
                id="text-address"
                name="address"
                label="주소"
                variant="standard"
                onChange={onChange}
                defaultValue={form.address}
              />
              <TextField
                id="text-phone"
                name="phone"
                label="핸드폰 번호"
                variant="standard"
                onChange={onChange}
                defaultValue={form.phone}
              />
              <Button orange fullWidth>
                수정
              </Button>
            </Box>
          </ProfileBox>
        </form>
      </ProfileBody>
    </ProfileWrapper>
  )
}

export default ProfileUpdateForm
