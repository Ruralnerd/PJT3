/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { Route } from 'react-router-dom'
import LoginPage from './views/LoginPage'

const AppStyle = css`
  margin: 0;
  padding: 0;
`

function App() {
  return (
    <div css={AppStyle}>
      <Route component={LoginPage} path="/login" />
    </div>
  )
}

export default App
