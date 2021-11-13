/** @jsxImportSource @emotion/react */

import { useState } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import palette from '../../lib/styles/palette'
import { useSelector, useDispatch } from 'react-redux'
import { imageUpload } from '../../modules/write'
// import styled from 'styled-components'
// import Button from '../common/Button'

const StoryEditor = ({ title, contents, onChangeField }) => {
  const dispatch = useDispatch()
  const { image, imageError } = useSelector(({ write }) => ({
    image: write.image,
    imageError: write.imageError,
  }))

  const [context, setContext] = useState('')
  const [fileImage, setFileImage] = useState('')

  const [test, setTest] = useState([])

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage)
    setFileImage('')
  }
  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value })
  }

  const { id } = useSelector(({ write }) => ({
    id: write.id.id,
  }))

  const onChangeImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]))
    const formData = new FormData()
    formData.append('image', e.target.files[0])
    dispatch(imageUpload({ id, formData }))
  }

  const onChangeContext = (e) => {
    setContext(e.target.value)
  }

  const NextButton1 = () => {
    document.getElementById('context').value = null
    document.getElementById('file').value = null
    URL.revokeObjectURL(fileImage)
    setFileImage('')
    setTest((prevList) => [...prevList, { img: image.img, content: context }])
  }

  const Check = () => {
    onChangeField({
      key: 'contents',
      value: test,
    })
  }

  const CreateStoryWrapper = css``

  const FileUploadArea = css`
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 50%;
    color: #999999;
    height: 2.5rem;
    border-radius: 4px;
    margin: 0.5rem 0;
    pointer-events: none;
  `

  const HiddenInput = css`
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  `

  const PreviewImage = css`
    width: 100%;
  `

  const FileUploadWrapper = css`
    display: flex;
    gap: 5%;
    align-items: center;
  `

  const SearchFileButton = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    margin-left: 0.5rem;
    padding: 0.5rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};
    /* &:hover {
      background: ${palette.gray[6]};
    } */
  `
  return (
    <div css={CreateStoryWrapper}>
      <TextField
        className="title"
        size="small"
        id="outlined-basic"
        label="제목"
        onChange={onChangeTitle}
        value={title}
        variant="outlined"
        fullWidth
      />

      <div css={FileUploadWrapper}>
        <input css={FileUploadArea} placeholder="첨부파일" />
        <input
          className="img"
          type="file"
          id="file"
          onChange={onChangeImage}
          css={HiddenInput}
          multiple
        />
        <label htmlFor="file" css={SearchFileButton}>
          파일 찾기
        </label>
        <button onClick={() => deleteFileImage()}>삭제</button>
        {/* <ImageDeleteButton onClick={() => deleteFileImage()}>
          삭제
        </ImageDeleteButton> */}
      </div>

      {fileImage && <img alt="sample" src={fileImage} css={PreviewImage} />}
      <TextField
        id="context"
        className="context"
        placeholder="내용을 입력해주세요."
        fullWidth
        multiline
        rows={4}
        // value={content}
        onChange={onChangeContext}
      />
      <button onClick={NextButton1}>다음</button>
      {/* <NextButton onClick={NextButton1}>다음</NextButton> */}
      <button onClick={Check}>확인</button>
    </div>
  )
}

export default StoryEditor
