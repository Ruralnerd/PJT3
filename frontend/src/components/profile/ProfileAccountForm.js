/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import Button from '../common/Button'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import LinearProgressBar from '../common/LinearProgressBar'
import palette from '../../lib/styles/palette'

const sizes = {
  desktop: '1024px',
  tablet: '768px',
  mobile: '360px',
}

const ProfileWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 16rem);
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

const ProfileAccountuserData = ({
  form,
  onChange,
  onSubmit,
  loading,
  error,
}) => {
  if (error) {
    return null
  }
  if (loading || !form) {
    return <LinearProgressBar />
  }
  return (
    <ProfileWrapper>
      <ProfileBody>
        <h1>계좌등록</h1>
        <div>
          <form onSubmit={onSubmit}>
            <ProfileBox>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                }}
              >
                <div>은행명 등록</div>
                <TextField
                  id="ac_bank"
                  name="ac_bank"
                  variant="standard"
                  onChange={onChange}
                  defaultValue={form.ac_bank}
                  placeholder="예) 부산은행"
                />
                <div>계좌번호</div>
                <TextField
                  id="ac_number"
                  name="ac_number"
                  variant="standard"
                  onChange={onChange}
                  defaultValue={form.ac_number}
                  placeholder="공백 및 '-' 없이 입력해주세요."
                />
                <Button middleWidth cyan onClick={onSubmit}>
                  판매자 등록
                </Button>
              </Box>
            </ProfileBox>
          </form>
        </div>
      </ProfileBody>
    </ProfileWrapper>
  )
}

export default ProfileAccountuserData
