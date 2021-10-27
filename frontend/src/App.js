/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import Login from './views/Login'

const AppStyle = css`
  margin: 0;
  padding: 0;
`

function App() {
  return (
    <div css={AppStyle}>
      <Login />
    </div>
  )
}

export default App
