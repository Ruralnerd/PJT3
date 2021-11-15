import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import LinearProgressBar from '../common/LinearProgressBar'

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

const SubInfo = styled.div`
  div {
    font-size: 12px;
    color: ${palette.gray[5]};
  }
  color: ${palette.gray[6]};

  span + span:before {
    color: ${palette.gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`

const SaleContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
`

const SaleViewer = ({ data, loading, error }) => {
  if (error) {
    if (error.response && error.response.status === 404) {
      return <SaleViewerWrapper>존재하지 않는 포스트입니다.</SaleViewerWrapper>
    }
    return <SaleViewerWrapper>오류 발생!</SaleViewerWrapper>
  }
  if (loading || !data) {
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
  } = data

  const contentsLength = contents.length
  return (
    <SaleViewerWrapper>
      <SaleHeader>
        <h1>{title}</h1>
        <SubInfo>
          <span>tester</span>
          <span>
            <div>
              가격: 1{unit}당 {price}원
            </div>
            <div>판매기간: {new Date(period).toTimeString()}까지</div>
            <div>
              수량: 총 {quantity}
              {unit}
            </div>
            <div>작성: {new Date(created_at).toLocaleDateString()}</div>
            <div>수정: {new Date(updated_at).toLocaleDateString()}</div>
            <div>조회: {hits}</div>
          </span>
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
