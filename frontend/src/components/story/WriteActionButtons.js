import React from 'react'
import styled from 'styled-components'
import Button from '../common/Button'

const WriteActionButtonsBlock = styled.div`
  display: flex;
  gap: 2%;
  justify-content: flex-end;
`

const StoryCreateButton = styled(Button)`
  padding: 0.5rem 0.7rem;
`

const CancelButton = styled(Button)`
  padding: 0.5rem 0.7rem;
`

const WriteActionButtons = ({ onCancel, onPublish }) => {
  return (
    <WriteActionButtonsBlock>
      <StoryCreateButton onClick={onPublish}>스토리 등록</StoryCreateButton>
      <CancelButton onClick={onCancel}>취소</CancelButton>
    </WriteActionButtonsBlock>
  )
}

export default WriteActionButtons
