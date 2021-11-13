/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ThemeProvider, createTheme } from '@mui/material'
import Button from '../common/Button'
import palette from '../../lib/styles/palette'
import Spinner from '../common/Spinner'
import SaleItemForm from './SaleItemForm'
import { useSelector } from 'react-redux'
import SaleContentForm from './SaleContentForm'

/**
 * 스토리 또는 마켓 에디터를 보여줍니다.
 */
const SaleFormWrapper = css``

const SaleInfoHeader = css`
  font-size: 24px;
  font-weight: bold;
`

const SaleInfoText = css`
  color: ${palette.gray[7]};
  font-weight: 200;
  font-size: 14px;
  margin-bottom: 14px;
`
// 이전, 다음 버튼으로 인터랙션 하면서 바뀌는 투명한 박스
const SaleInfoBox = css``

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

const SaleForm = ({
  form,
  onPrev,
  onNext,
  onChange,
  onPutChange,
  onPostSale,
  onPostImage,
  onPutSale,
}) => {
  const { loadingStatus } = useSelector(({ loading }) => ({
    loadingStatus: loading,
  }))
  const toggleButtonGroup = () => {
    if (form.current_page === 1) {
      return (
        <Button middleWidth red onClick={onPostSale}>
          {loadingStatus['sale/POST'] === true ? <Spinner /> : '다음'}
        </Button>
      )
    } else if (form.current_page === form.all_page) {
      return (
        <>
          <Button middleWidth orange onClick={onPrev}>
            이전
          </Button>
          <Button middleWidth red onClick={onPutSale}>
            {loadingStatus['sale/PUT'] === true ? <Spinner /> : '저장하기'}
          </Button>
          <Button middleWidth cyan>
            사진추가
          </Button>
        </>
      )
    } else {
      return (
        <>
          <Button middleWidth orange onClick={onPrev}>
            이전
          </Button>
          <Button middleWidth orange onClick={onNext}>
            다음
          </Button>
        </>
      )
    }
  }

  return (
    <div css={SaleFormWrapper}>
      <div css={SaleInfoHeader}>장터</div>
      <hr />
      <ThemeProvider theme={theme}>
        {form.current_page === 1 ? (
          <>
            {/* 맨 앞 페이지 */}
            <div css={SaleInfoText}>판매할 상품의 정보를 입력해 주세요.</div>
            <div css={SaleInfoBox}>
              <SaleItemForm form={form} onChange={onChange} />
            </div>
          </>
        ) : (
          <>
            {/* 이미지와 콘텐츠를 추가하는 PUT 메소드 페이지 */}
            <div css={SaleInfoText}>
              상품을 소개하는 이미지와 설명을 입력해 주세요.
            </div>
            <div css={SaleInfoBox}>
              <SaleContentForm
                form={form}
                onPutChange={onPutChange}
                onPostImage={onPostImage}
              />
            </div>
          </>
        )}
        <div css={ToggleButtons}>{toggleButtonGroup()}</div>
      </ThemeProvider>
    </div>
  )
}

export default SaleForm
