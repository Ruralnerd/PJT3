/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { ThemeProvider, createTheme } from '@mui/material'
import Button from '../common/Button'
import palette from '../../lib/styles/palette'
import Spinner from '../common/Spinner'
import SaleFormItem from './SaleFormItem'
import { useSelector } from 'react-redux'
import SaleFormContent from './SaleFormContent'

/**
 * 스토리 또는 마켓 에디터를 보여줍니다.
 */
const SaleFormWrapper = css``

const SaleInfoHeader = css`
  font-size: 24px;
  font-weight: bold;
`

const SaleInfoText = css`
  color: #3b31bb;
  font-weight: 400;
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
  onAddContent,
  onDeleteSale,
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
    } else if (form.current_page === 2) {
      if (form.current_page === form.all_page) {
        return (
          <>
            <Button middleWidth orange onClick={onDeleteSale}>
              삭제
            </Button>
            <Button middleWidth red onClick={onPutSale}>
              {loadingStatus['sale/PUT'] === true ? <Spinner /> : '저장'}
            </Button>
            <Button middleWidth cyan onClick={onAddContent}>
              사진추가
            </Button>
          </>
        )
      } else {
        return (
          <>
            <Button middleWidth orange onClick={onDeleteSale}>
              삭제
            </Button>
            <Button middleWidth orange onClick={onNext}>
              다음
            </Button>
          </>
        )
      }
    } else if (form.current_page === form.all_page) {
      return (
        <>
          <Button middleWidth orange onClick={onPrev}>
            이전
          </Button>
          <Button middleWidth red onClick={onPutSale}>
            {loadingStatus['sale/PUT'] === true ? <Spinner /> : '저장'}
          </Button>
          <Button middleWidth cyan onClick={onAddContent}>
            추가
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
  const infoTextMaker = (page) => {
    if (page === 2) {
      return (
        <div css={SaleInfoText}>
          첫 시작이네요! 상품의 대표 사진을 넣어주세요. 가장 예쁜 사진으로요!
        </div>
      )
    } else if (page === 3) {
      return (
        <div css={SaleInfoText}>
          농부님이 잘 나온 사진을 올려주세요. 셀카도 좋아요!
        </div>
      )
    } else if (page === 4) {
      return <div css={SaleInfoText}>농장의 전경이 찍힌 사진을 올려주세요.</div>
    } else if (page === 5) {
      return (
        <div css={SaleInfoText}>
          상품을 자세히 보고 싶어요! 상품을 조금 더 가까이에서 찍어 주세요.
        </div>
      )
    } else {
      return (
        <div css={SaleInfoText}>
          상품을 소개하는 이미지와 설명을 입력해 주세요.
        </div>
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
              <SaleFormItem form={form} onChange={onChange} />
            </div>
          </>
        ) : (
          <>
            {/* 이미지와 콘텐츠를 추가하는 PUT 메소드 페이지 */}
            {infoTextMaker(form.current_page)}
            <div css={SaleInfoBox}>
              <SaleFormContent
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
