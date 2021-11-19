/** @jsxImportSource @emotion/react */

import { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import palette from '../../lib/styles/palette'
import { useSelector, useDispatch } from 'react-redux'
import { imageUpload } from '../../modules/story'
import styled from 'styled-components'
import Button from '../common/Button'

const ImageDeleteButton = styled(Button)`
  padding: 0.5rem 0.7rem;
  background-color: red;
`

const NextPageButton = styled(Button)`
  padding: 0.5rem 0.7rem;
  float: right;
`

const StoryEditor = ({ title, onChangeField }) => {
  const dispatch = useDispatch()
  const { image } = useSelector(({ story }) => ({
    image: story.image,
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

  const { id } = useSelector(({ story }) => ({
    id: story.id,
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

  const NextButton = () => {
    if (fileImage === '') {
      alert('사진은 꼭 넣어주셔야 해요!')
    } else {
      document.getElementById('context').value = null
      document.getElementById('file').value = null
      URL.revokeObjectURL(fileImage)
      setFileImage('')
      setTest((test) => [...test, { img: image.img, content: context }])
    }
  }

  useEffect(() => {
    onChangeField({
      key: 'contents',
      value: test,
    })
    return () => {
      //unmount
    }
  }, [onChangeField, test])

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
    border-radius: 4%;
  `

  const FileUploadWrapper = css`
    display: flex;
    gap: 3%;
    align-items: center;
  `

  const SearchFileButton = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    margin-left: 0.5rem;
    padding: 0.4rem 0.6rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};
    /* &:hover {
      background: ${palette.gray[6]};
    } */
  `

  const FilePathText = css`
    background-color: white;
    width: 40%;
    position: absolute;
    margin-left: 3%;
    overflow: hidden;
    text-overflow: clip;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  `

  let filePath
  if (document.getElementById('file')) {
    var file = document.getElementById('file')
    filePath = file.value.slice(12)
  }

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
        {filePath && <span css={FilePathText}>{filePath}</span>}

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
        onChange={onChangeContext}
      />
      <NextPageButton onClick={NextButton}>다음</NextPageButton>
    </div>
  )
}

export default StoryEditor
