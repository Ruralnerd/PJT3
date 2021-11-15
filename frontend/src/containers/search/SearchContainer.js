/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React from 'react'
import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSearch } from '../../modules/search'
import { changeField, initialize } from '../../modules/search'
import SearchForm from '../../components/search/SearchForm'
import NativeSelect from '@mui/material/NativeSelect'
import Button from '../../components/common/Button'
import InputBase from '@mui/material/InputBase'
import { styled } from '@mui/material/styles'
import reactstyled from 'styled-components'
import palette from '../../lib/styles/palette'

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))

const SearchButton = reactstyled(Button)`
  &:hover {
    background: ${palette.gray[8]};
  }
`

const SearchContainer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    return () => {
      // 언마운트
      dispatch(initialize())
    }
  }, [dispatch])

  const { mainKeyword, keyword, searchList } = useSelector(({ search }) => ({
    mainKeyword: search.mainKeyword,
    keyword: search.keyword,
    searchList: search.searchList,
  }))

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  )

  const onChangeKeyword = (e) => {
    onChangeField({ key: 'keyword', value: e.target.value })
  }

  const onChangeMainKeyword = (e) => {
    onChangeField({ key: 'mainKeyword', value: e.target.value })
  }

  const onSearch = () => {
    dispatch(getSearch({ mainKeyword, keyword }))
  }

  return (
    <>
      <div
        css={css`
          display: flex;
          gap: 1%;
        `}
      >
        <NativeSelect
          id="demo-customized-select-native"
          onChange={onChangeMainKeyword}
          input={<BootstrapInput />}
          css={css`
            width: 35%;
          `}
        >
          <option value={'markets'}>마켓</option>
          <option value={'storys'}>스토리</option>
        </NativeSelect>
        <BootstrapInput onChange={onChangeKeyword} />
        <SearchButton onClick={onSearch}>검색</SearchButton>
      </div>

      <SearchForm searchList={searchList} />
    </>
  )
}

export default SearchContainer
