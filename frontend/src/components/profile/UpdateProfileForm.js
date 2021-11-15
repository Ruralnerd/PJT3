/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useEffect, useState } from 'react'
import Spinner from '../common/Spinner'
import { useDispatch } from 'react-redux'
import { changeField } from '../../modules/profile'

const ProfileUser = css`
  display: flex;
  border: 3px solid blue;
`
const ProfileUserImg = css`
  max-width: 50%;
  border: 3px solid red;
`
const ProfileUserData = css`
  max-width: 50%;
  border: 3px solid green;
`

const UpdateProfileForm = ({
  loadingProfile,
  type,
  form,
  onChange,
  onSubmit,
}) => {
  const ProfileUpdateButton = () => {}
  return (
    <div>
      {loadingProfile && '로딩 중...'}
      {!loadingProfile && form && (
        <div>
          <div>구매자님의 프로필</div>
          <div css={ProfileUser}>
            <div css={ProfileUserImg}>{form.profile_img}</div>
            <div css={ProfileUserData}>
              <form onSubmit={onSubmit}>
                <input
                  name="email"
                  onChange={onChange}
                  value={form.email || ''}
                />
                <input
                  name="nickname"
                  onChange={onChange}
                  value={form.nickname || ''}
                />

                <input
                  name="password"
                  type="password"
                  onChange={onChange}
                  value={form.password || ''}
                />
                <input
                  name="address"
                  placeholder="등록된 주소가 없습니다."
                  onChange={onChange}
                  value={form.address || ''}
                />
                <div>phone</div>
                <input
                  name="nickname"
                  placeholder="등록된 연락처가 없습니다."
                  onChange={onChange}
                  value={form.phone || ''}
                />
                <input
                  name="is_seller"
                  onChange={onChange}
                  value={form.is_seller}
                />
                <input
                  name="ac_number"
                  placeholder="등록된 계좌번호가 없습니다."
                  onChange={onChange}
                  value={form.ac_number || ''}
                />
                <input
                  name="ac_bank"
                  placeholder="등록된 은행이 없습니다."
                  onChange={onChange}
                  value={form.ac_bank || ''}
                />
              </form>
            </div>
          </div>
          <button onClick={onSubmit}>수정 완료</button>
        </div>
      )}
    </div>
  )
}

export default UpdateProfileForm
