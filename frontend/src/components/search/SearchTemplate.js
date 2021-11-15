/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React from 'react'

const SearchTemplate = ({ children }) => {
  const SaleTemplateWrapper = css`
    margin: 3%;
  `

  return <div css={SaleTemplateWrapper}>{children}</div>
}

export default SearchTemplate
