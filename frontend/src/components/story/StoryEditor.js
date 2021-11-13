/** @jsxImportSource @emotion/react */

import { useState } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import palette from '../../lib/styles/palette'
import { useSelector, useDispatch } from 'react-redux'
import { imageUpload } from '../../modules/write'
import styled from 'styled-components'
import Button from '../common/Button'

const StoryEditor = ({ title, contents, onChangeField }) => {
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
  const dispatch = useDispatch()
  const { image, imageError } = useSelector(({ write }) => ({
    image: write.image,
    imageError: write.imageError,
  }))

  const [context, setContext] = useState('')
  const [fileImage, setFileImage] = useState('')
  const [imagePreview, setImagePreview] = useState('')

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
    const formData = new FormData()
    formData.append('image', e.target.files[0])

    setFileImage(URL.createObjectURL(e.target.files[0]))
    // onChangeField({ key: 'img', value: e.target.files[0] })
    setImagePreview(e.target.files[0])
    dispatch(imageUpload({ id, formData }))
  }

  const onChangeContext = (e) => {
    // onChangeField({ key: 'context', value: e.target.value })
    setContext(e.target.value)
  }

  // const formData = new FormData()

  const NextButton1 = () => {
    // const formData = new FormData()
    // formData.append('img', image)
    // formData.append('context', context)
    // formData.append('img', image)
    // formData.append('context', context)
    // formData.append('contents', image)

    document.getElementById('context').value = null
    document.getElementById('file').value = null
    URL.revokeObjectURL(fileImage)
    setFileImage('')
    // for (let value of formData.values()) {
    //   console.log(value)
    // }

    // onChangeField({
    //   key: 'contents',
    //   value: [{ image: fileImage, content: context }],
    //   // value: 'gkgkzjsxpscm',
    // })

    setTest((prevList) => [...prevList, { img: image.img, content: context }])
    // onChangeField({ key: 'contents', value: formData })
  }

  const Check = () => {
    console.log(id)
    onChangeField({
      key: 'contents',
      value: test,
    })
    // for (var pair of formData.entries()) {
    //   console.log(pair)
    // }
  }

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

  const ImageDeleteButton = styled(Button)`
    padding: 0.5rem;
  `

  const NextButton = styled(Button)`
    padding: 0.5rem;
    background-color: blue;
    float: right;
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
        <ImageDeleteButton onClick={() => deleteFileImage()}>
          삭제
        </ImageDeleteButton>
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
      <NextButton onClick={NextButton1}>다음</NextButton>
      <button onClick={Check}>확인</button>
    </div>
  )
}

export default StoryEditor
