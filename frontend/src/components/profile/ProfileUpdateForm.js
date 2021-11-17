/** @jsxImportSource @emotion/react */

import DaumPostcode from 'react-daum-postcode'
import { useState } from 'react'
import { css } from '@emotion/react'
import Spinner from '../common/Spinner'
import { Box } from '@mui/system'
import {
  FormControl,
  Input,
  TextField,
  InputAdornment,
  InputLabel,
  ThemeProvider,
  createTheme,
} from '@mui/material'

import Post from '../../components/common/Post'

import Button from '../common/Button'

const postCodeStyle = css`
  display: 'block';
  position: 'absolute';
  top: '50%';
  width: '400px';
  height: '500px';
  padding: '7px';
`

const ProfileUpdateuserData = ({ form, onChange, onSubmit }) => {
  // 주석 처리된 부분과 components/common/Post.js는 도로명주소 API용임
  // npm i react-daum-postcode로 설치 가능
  // const [popup, setPopup] = useState(false)

  return (
    <>
      {form && (
        <div>
          <div>
            {/* 닉네임이 같이 바뀜.. */}
            <p>{form.nickname}</p>
            <form onSubmit={onSubmit}>
              <Button>수정</Button>
              <Box
                sx={{
                  display: 'grid',
                  gap: 1,
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
                {/* 여기서부터 도로명주소 어쩌구 
                <button
                  onClick={() => {
                    setPopup(!popup)
                  }}
                ></button>
                {popup && <Post address={address} setAddress={setAddress}></Post>} */}
                <TextField
                  id="text-phone"
                  name="phone"
                  label="핸드폰 번호"
                  variant="standard"
                  onChange={onChange}
                  defaultValue={form.phone}
                />
              </Box>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ProfileUpdateuserData
