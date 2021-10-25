/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'
const color = 'white'

function App() {
  return (
    <div className="App">
      <div
        css={css`
          padding: 32px;
          background-color: hotpink;
          font-size: 24px;
          border-radius: 4px;
          &:hover {
            color: ${color};
          }
        `}
      >
        Hover to change color.
      </div>
    </div>
  )
}

export default App
