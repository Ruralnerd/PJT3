/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Box } from '@mui/system'
import {
  FormControl,
  Input,
  TextField,
  InputAdornment,
  InputLabel,
  ThemeProvider,
  createTheme,
  MenuItem,
} from '@mui/material'
import Button from '../common/Button'
import palette from '../../lib/styles/palette'
import { useState } from 'react'

/**
 * 스토리 또는 마켓 에디터를 보여줍니다.
 */
const SaleFormWrapper = css``

const SaleHeader = css`
  font-size: 24px;
  font-weight: bold;
`

const SaleInfoText = css`
  color: ${palette.gray[7]};
  font-weight: 200;
  font-size: 14px;
`

// Mui theme customizing
const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR'],
    fontSize: 12,
  },
})

const textMap = {
  market: '장터',
}

const itemUnit = [
  {
    value: 'kg',
    label: 'kg',
  },
  {
    value: '개',
    label: '개',
  },
]

const SaleForm = ({ type, form, onChange, onSubmit }) => {
  const text = textMap[type]

  return (
    <div css={SaleFormWrapper}>
      <div css={SaleHeader}>{text}</div>
      <hr />
      <ThemeProvider theme={theme}>
        <form onSubmit={onSubmit}>
          {/* type: market 판매 글 등록 */}
          {type === 'market' && (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gap: 2,
                }}
              >
                <div css={SaleInfoText}>
                  판매할 상품의 정보를 입력해 주세요.
                </div>
                <TextField
                  id="title"
                  name="title"
                  label="상품명"
                  variant="outlined"
                  value={form.name}
                  onChange={onChange}
                />
                <TextField
                  id="unit"
                  select
                  name="unit"
                  label="판매 단위"
                  value={form.unit}
                  onChange={onChange}
                  helperText="판매 단위를 선택해 주세요."
                >
                  {itemUnit.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              <Button orange fullWidth>
                다음
              </Button>
            </>
          )}
        </form>
      </ThemeProvider>
    </div>
  )
}

export default SaleForm
