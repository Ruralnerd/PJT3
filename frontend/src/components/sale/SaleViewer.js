import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import LinearProgressBar from '../common/LinearProgressBar'
import SubInfo from '../common/SubInfo'

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

const SaleViewer = ({ detail, loading, error }) => {
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
      </SaleHeader>
      <SaleContent>
        {contents.map((content) => (
          <>
            <img src={content.img} alt="" />
            {content.sequence + 1}/{contentsLength}
            <br />
            {content.content}
            <hr />
          </>
        ))}
      </SaleContent>
    </SaleViewerWrapper>
  )
}

export default SaleViewer
