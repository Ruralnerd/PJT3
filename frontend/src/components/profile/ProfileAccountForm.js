/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import Button from '../common/Button'
import { TextField } from '@mui/material'
import LinearProgressBar from '../common/LinearProgressBar'

const ProfileWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 15rem);
`

const ProfileAccountuserData = ({
  form,
  onChange,
  onSubmit,
  loading,
  error,
}) => {
  if (loading || !form) {
    return <LinearProgressBar />
  }
  return (
    <ProfileWrapper>
      <p>{form.id}</p>
      <div>계좌등록</div>
      <div>
        <form onSubmit={onSubmit}>
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
        </form>

        <Button middleWidth cyan onClick={onSubmit}>
          판매자 등록
        </Button>
      </div>
    </ProfileWrapper>
  )
}

export default ProfileAccountuserData
