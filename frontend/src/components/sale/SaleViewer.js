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
import { Grid } from '@mui/material'
import StoryListCard from '../common/StoryListCard'

const SaleViewerWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 15rem);
  padding: 0.5rem;
`

const SaleBanner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 1rem;

  div {
    font-size: 16px;
  }
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

const SaleBody = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`

const SaleInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`
const PayLogo = styled.img`
  cursor: pointer;
  width: 80px;
`

const SaleInfoImage = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 100%;
`

const SaleInfoText = styled.div`
  border-radius: 4px;
  padding: 20px;
`

const SaleContent = styled.div`
  overflow: hidden;
  width: 100%;
  display: flex;
  margin-top: 2rem;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  color: ${palette.gray[8]};
`

const SaleContentImageBox = styled.div`
  width: 800px;
  height: 600px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 1rem;

  @media screen and (max-width: 1440px) {
    width: 600px;
    height: 400px;
  }

  @media screen and (max-width: 1200px) {
    width: 550px;
    height: 350px;
  }

  @media screen and (max-width: 1024px) {
    width: 500px;
    height: 300px;
  }

  @media screen and (max-width: 768px) {
    width: 300px;
    height: 200px;
  }
`

const SaleContentImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`

const SaleContentText = styled.div`
  font-size: 20px;
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

const SaleViewer = ({
  user_id,
  form,
  detail,
  loading,
  error,
  onChange,
  onPostPay,
  onDeleteSale,
}) => {
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

  const periodCvt = (period) => {
    return period.substring(0, 10) + ' / ' + period.substring(27)
  }

  return (
    <SaleViewerWrapper>
      <SaleBanner>
        {user_id && seller && user_id.toString() === seller.id.toString() && (
          <Button red onClick={onDeleteSale}>
            글 삭제
          </Button>
        )}
      </SaleBanner>
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
      <SaleBody>
        <SaleInfo>
          <SaleInfoImage src={`${thumbnail_img}`} />
          <SaleInfoText>
            <h1>{title}</h1>
            <div>
              가격: {price} / {unit}
            </div>
            <div>
              재고: {quantity}
              {unit}
            </div>
            <div>조회수: {hits}</div>
            <div>판매기간: {periodCvt(period)} 까지</div>
            <hr />
            <PayLogo
              src="/images/icon/kakao_payment_icon_large.png"
              alt="kakao_pay"
              onClick={handlePayModal}
            />
          </SaleInfoText>
        </SaleInfo>
      </SaleBody>
      <h1 style={{ textAlign: 'center' }}>상품사진</h1>
      {contents.map((content) => (
        <div key={content.sequence}>
          <SaleContent>
            <SaleContentImageBox>
              <SaleContentImage src={content.img} alt="content_img" />
            </SaleContentImageBox>
            <SaleContentText>{content.content}</SaleContentText>
          </SaleContent>
        </div>
      ))}
      {storys.length !== 0 && (
        <>
          <h3>{seller.nickname}님의 스토리</h3>
          <Grid container spacing={2}>
            {storys.map((story) => (
              <Grid item xs={12} sm={6} md={4} key={story.id}>
                <StoryListCard story={story} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </SaleViewerWrapper>
  )
}

export default SaleViewer
