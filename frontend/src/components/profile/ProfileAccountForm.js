/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Spinner from '../common/Spinner'
import Button from '../common/Button'
import { TextField } from '@mui/material'

const ProfileAccountuserData = ({ form, onChange, onSubmit }) => {
  return (
    <>
      {form && (
        <div>
          <p>{form.id}</p>
          <div>계좌등록</div>
          <div>
            <form onSubmit={onSubmit}>
              <div>은행명 등록</div>
              <TextField
                id="ac_number"
                name="ac_number"
                variant="standard"
                onChange={onChange}
                defaultValue={form.ac_number}
                placeholder="예) 부산은행"
              />
              <div>계좌번호</div>
              <TextField
                id="ac_bank"
                name="ac_bank"
                variant="standard"
                onChange={onChange}
                defaultValue={form.ac_bank}
                placeholder="공백 및 '-' 없이 입력해주세요."
              />
            </form>

            <Button middleWidth cyan onClick={onSubmit}>
              판매자 등록
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileAccountuserData
