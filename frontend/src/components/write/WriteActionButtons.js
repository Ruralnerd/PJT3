import React from 'react'
import styled from 'styled-components'
import Button from '../common/Button'

const WriteActionButtonsBlock = styled.div`
  button + button {
    margin-left: 0.5rem;
  }
`

// TagBox에서 사용하는 버튼과 일차하는 높이로 설정한 후 서로 간의 여백 지정
const StyledButton = styled(Button)`
  padding: 0.5rem 0.7rem;
  /* height: 2.125rem;
  & + & {
    margin-left: 0.5rem;
  } */
`

const WriteActionButtons = ({ onCancel, onPublish }) => {
  return (
    <WriteActionButtonsBlock>
      <StyledButton cyan onClick={onPublish}>
        스토리 등록
      </StyledButton>
      <StyledButton onClick={onCancel}>취소</StyledButton>
    </WriteActionButtonsBlock>
  )
}

export default WriteActionButtons