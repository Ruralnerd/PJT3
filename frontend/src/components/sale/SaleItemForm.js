import { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { TextField, InputAdornment, MenuItem } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import { useDispatch } from 'react-redux'
import { changeField } from '../../modules/sale'

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

const SaleItemForm = ({ form, onChange }) => {
  const [dateTime, setDateTime] = useState(new Date())
  const dispatch = useDispatch()

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
    <div>
      <Box
        sx={{
          display: 'grid',
          gap: 2,
        }}
      >
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
              <InputAdornment position="start">{form.unit}</InputAdornment>
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
            endAdornment: <InputAdornment position="start">원</InputAdornment>,
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            label="판매 종료일"
            name="period"
            value={dateTime}
            inputFormat="yyyy/MM/dd hh:mm a"
            mask="___/__/__ __:__ _M"
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
    </div>
  )
}

export default SaleItemForm
