/** @jsxImportSource @emotion/react */

import { useState } from 'react'
import { TextField } from '@mui/material'
import { css } from '@emotion/react'
import palette from '../../lib/styles/palette'

const StoryEditor = ({ title, img, content, onChangeField }) => {
  const CreateStoryWrapper = css``

  const FileUploadArea = css`
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid #dddddd;
    width: 56%;
    color: #999999;
    height: 2.5rem;
    border-radius: 4px;
    margin: 0.5rem 0;
    pointer-events: none;
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

  const HiddenInput = css`
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  `

  const ImageDeleteButton = css`
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    margin-left: 0.5rem;
    padding: 0.6rem;
    color: white;
    outline: none;
    cursor: pointer;

    background: ${palette.gray[8]};
    /* &:hover {
      background: ${palette.gray[6]};
    } */
  `

  const PreviewImage = css`
    width: 100%;
  `

  const FileUploadWrapper = css`
    display: flex;
    align-items: center;
  `
  const [context, setContext] = useState('')
  const [fileImage, setFileImage] = useState('')
  const [image, setImage] = useState('')
  const [andxoddl, setAndxoddl] = useState([])

  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage)
    setFileImage('')
  }
  const onChangeTitle = (e) => {
    onChangeField({ key: 'title', value: e.target.value })
  }

  const onChangeImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]))
    onChangeField({ key: 'img', value: e.target.files[0] })
    setImage(e.target.files[0])
  }

  const onChangeContext = (e) => {
    // onChangeField({ key: 'content', value: e.target.value })
    setContext(e.target.value)
  }

  const formData = new FormData()

  const NextButton = () => {
    // console.log(image)
    // console.log(context)
    formData.append('content', [image, context])
    // formData.append('content', context)
    document.getElementById('context').value = null
    document.getElementById('file').value = null
    URL.revokeObjectURL(fileImage)
    setFileImage('')
    setAndxoddl((prevList) => [...prevList, formData])

    // formData.append()
  }

  const Check = () => {
    onChangeField({ key: 'content', value: andxoddl })

    console.log(andxoddl[0].get('content'))
    console.log(andxoddl[1].get('content'))

    // for (var pair of formData.entries()) {
    //   console.log(pair)
    // console.log(pair[1])
    // }
    // console.log(andxoddl)
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
        <button css={ImageDeleteButton} onClick={() => deleteFileImage()}>
          삭제
        </button>
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
      <button
        onClick={NextButton}
        css={css`
          float: right;
        `}
      >
        다음
      </button>
      <button onClick={Check}>확인</button>
    </div>
  )
}

export default StoryEditor
