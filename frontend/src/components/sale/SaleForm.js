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
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Button from '../common/Button'
import palette from '../../lib/styles/palette'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeField } from '../../modules/sale'

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

const ToggleButtons = css`
  display: flex;
  flex-flow: row;
  justify-content: space-around;
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
  const [dateTime, setDateTime] = useState(new Date())
  const dispatch = useDispatch()
  const a = false

  useEffect(() => {
    dispatch(
      changeField({
        form: 'item',
        key: 'period',
        value: dateTime.toISOString(),
      }),
    )
  }, [dateTime, dispatch])

  return (
    <div css={SaleFormWrapper}>
      <div css={SaleHeader}>{text}</div>
      <hr />
      <ThemeProvider theme={theme}>
        {/* type: market 판매 글 등록 */}
        {type === 'market' && (
          <>
            <Box
              sx={{
                display: 'grid',
                gap: 2,
              }}
            >
              <div css={SaleInfoText}>판매할 상품의 정보를 입력해 주세요.</div>
              <TextField
                id="title"
                name="title"
                label="상품명"
                variant="outlined"
                value={form.title}
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
              <TextField
                id="quantity"
                name="quantity"
                label="판매 수량"
                value={form.quantity}
                onChange={onChange}
                helperText="판매 수량을 입력해 주세요."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      {form.unit}
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="price"
                name="price"
                label="판매 수량"
                value={form.price}
                onChange={onChange}
                helperText="판매 가격을 입력해 주세요."
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">원</InputAdornment>
                  ),
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  label="판매 종료일"
                  name="period"
                  value={dateTime}
                  onChange={(newDateTime) => {
                    setDateTime(newDateTime)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText="판매 종료일을 입력해 주세요."
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </>
        )}
        <div css={ToggleButtons}>
          <Button middleWidth orange>
            이전
          </Button>
          <Button middleWidth cyan>
            저장하기
          </Button>
          <Button middleWidth orange>
            다음
          </Button>
          {a === true && <Button orange>다음</Button>}
        </div>
      </ThemeProvider>
    </div>
  )
}

export default SaleForm
