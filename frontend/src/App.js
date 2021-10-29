/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
import { Route } from 'react-router-dom'
import LoginPage from './views/LoginPage'
import RegisterPage from './views/RegisterPage'

function App() {
  return (
    <>
      <Route component={LoginPage} path={['/', '/login']} exact />
      <Route component={RegisterPage} path="/register" />
    </>
  )
}

export default App
