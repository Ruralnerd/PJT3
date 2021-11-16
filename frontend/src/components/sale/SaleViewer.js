import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import LinearProgressBar from '../common/LinearProgressBar'
import SubInfo from '../common/SubInfo'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { useState } from 'react'
import { TextField } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material'
import Button from '../common/Button'
import Spinner from '../common/Spinner'

const SaleViewerWrapper = styled.div`
  padding: 0.5rem;
`

const SaleHeader = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  h1 {
    font-size: 2rem;
    line-height: 1.5;
    margin: 0;
  }
`

const SaleContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`

const payModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'grid',
  gap: 2,
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: `1px solid ${palette.gray[4]}`,
  borderRadius: 2,
  boxShadow: 24,
  pl: 3,
  pr: 3,
  pb: 3,
}

// Mui theme customizing
const theme = createTheme({
  typography: {
    fontFamily: ['Noto Sans KR'],
    fontSize: 12,
  },
})

const SaleViewer = ({ form, detail, loading, error, onChange, onPostPay }) => {
  const [payOpen, setPayOpen] = useState(false)

  const handlePayModal = () => {
    setPayOpen(!payOpen)
  }
  if (error) {
    if (error.response && error.response.status === 404) {
      return <SaleViewerWrapper>존재하지 않는 포스트입니다.</SaleViewerWrapper>
    }
    return <SaleViewerWrapper>오류 발생!</SaleViewerWrapper>
  }
  if (loading['sale/GET'] || !detail) {
    return <LinearProgressBar />
  }
  const {
    seller,
    title,
    price,
    period,
    unit,
    quantity,
    contents,
    storys,
    thumbnail_img,
    hits,
    created_at,
    updated_at,
  } = detail

  const subInfoDetail = {
    price,
    period,
    unit,
    quantity,
    hits,
    created_at,
    updated_at,
  }

  const contentsLength = contents.length
  return (
    <SaleViewerWrapper>
      <SaleHeader>
        <h1>{title}</h1>
        <SubInfo seller={seller} detail={subInfoDetail} hasMarginTop>
          <span>tester</span>
        </SubInfo>
        {/* Kakao pay modal */}
        <img
          src="/images/icon/kakao_payment_icon_large.png"
          alt="kakao_pay"
          onClick={handlePayModal}
        />
        <ThemeProvider theme={theme}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={payOpen}
            onClose={handlePayModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={payOpen}>
              <Box sx={payModalStyle}>
                <h2>카카오페이 결제</h2>
                <TextField
                  id="quantity"
                  name="quantity"
                  label="구매 수량"
                  helperText="구매 수량을 선택해 주세요."
                  variant="outlined"
                  value={form.quantity}
                  onChange={onChange}
                />
                <TextField
                  id="address"
                  name="address"
                  label="주소"
                  helperText="주소를 입력해 주세요."
                  variant="outlined"
                  value={form.address}
                  onChange={onChange}
                />
                <TextField
                  id="phone"
                  name="phone"
                  label="전화번호"
                  helperText="전화번호를 입력해 주세요."
                  variant="outlined"
                  value={form.phone}
                  onChange={onChange}
                />
                <Button fullWidth yellow onClick={onPostPay}>
                  {loading['pay/POST_PAY'] === true ? <Spinner /> : '결제'}
                </Button>
              </Box>
            </Fade>
          </Modal>
        </ThemeProvider>
      </SaleHeader>
      <SaleContent>
        {contents.map((content) => (
          <div key={content.sequence}>
            <img src={content.img} alt="" />
            {content.sequence}/{contentsLength}
            <br />
            {content.content}
            <hr />
          </div>
        ))}
      </SaleContent>
    </SaleViewerWrapper>
  )
}

export default SaleViewer
