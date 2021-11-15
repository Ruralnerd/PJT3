/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import Spinner from '../common/Spinner'

import { TextField } from '@mui/material'

const ProfileUpdateuserData = ({ form, onChange, onSubmit }) => {
  return (
    <>
      {form && (
        <div>
          <p>{form.id}</p>
          <div>구매자님의 프로필</div>
          <div>
            <form onSubmit={onSubmit}>
              <button>제발..</button>
              <TextField
                fullWidth
                id="nickname"
                name="nickname"
                variant="standard"
                onChange={onChange}
                value={form.nickname}
              />
              <TextField
                id="phone"
                name="phone"
                variant="standard"
                onChange={onChange}
                defaultValue={form.phone}
                placeholder="등록된 연락처가 없습니다."
              />
              <TextField
                id="address"
                name="address"
                variant="standard"
                onChange={onChange}
                defaultValue={form.address}
                placeholder="등록된 주소가 없습니다."
              />
              <TextField
                id="ac_number"
                name="ac_number"
                variant="standard"
                onChange={onChange}
                defaultValue={form.ac_number}
                placeholder="등록된 계좌번호가 없습니다."
              />
              <TextField
                id="ac_bank"
                name="ac_bank"
                variant="standard"
                onChange={onChange}
                defaultValue={form.ac_bank}
                placeholder="등록된 은행이 없습니다."
              />
              <TextField
                id="password"
                type="password"
                name="password"
                onChange={onChange}
              />
            </form>
          </div>
        </div>
      )}
    </>
    // <div>
    //   {loadingProfile && '로딩 중...'}
    //   {!loadingProfile && userData && (
    //     <div>
    //
    //     </div>
    //   )}
    // </div>
  )
}

export default ProfileUpdateuserData
