import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import LinearProgressBar from '../common/LinearProgressBar'
import SubInfo from '../common/SubInfo'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import { useState } from 'react'

const SaleViewerWrapper = styled.div`
  padding: 0.5rem;
  margin-bottom: 5rem;
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
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pl: 1,
}

const SaleViewer = ({ detail, loading, error, onPostPay }) => {
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
  if (loading || !detail) {
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
              <h2>시발섹스</h2>
              <button onClick={onPostPay}>결제</button>
            </Box>
          </Fade>
        </Modal>
      </SaleHeader>
      <SaleContent>
        {contents.map((content) => (
          <div key={content.sequence}>
            <img src={content.img} alt="" />
            {content.sequence + 1}/{contentsLength}
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
