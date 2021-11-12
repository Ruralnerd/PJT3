import styled, { css } from 'styled-components'
import palette from '../../lib/styles/palette'

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  margin: 0.5rem 0;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.middleWidth &&
    css`
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
      font-size: 0.875rem;
    `}

  ${(props) =>
    props.orange &&
    css`
      background: ${palette.orange[5]};
      &:hover {
        background: ${palette.orange[3]};
        transition: 0.2s ease-in;
      }
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.red[6]};
      &:hover {
        background: ${palette.red[8]};
        transition: 0.2s ease-in;
      }
    `}
`

const Button = (props) => {
  return <StyledButton {...props} />
}

export default Button
