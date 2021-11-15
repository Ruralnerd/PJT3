import styled from 'styled-components'
import palette from '../../lib/styles/palette'
import Button from '../common/Button'
import LinearProgressBar from '../common/LinearProgressBar'
import { Link } from 'react-router-dom'
import SubInfo from '../common/SubInfo'

const SaleListWrapper = styled.div`
  padding: 0.5rem;
`

const SaleListButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`

const SaleItemWrapper = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;

  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }
  h3 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
    p {
      margin-top: 1rem;
    }
  }
`

const SaleItem = ({ detail }) => {
  return (
    <SaleItemWrapper>
      <Link to={`/market/${detail.id}`}>
        <img src={detail.thumbnail_img} alt=""></img>
        <SubInfo seller={detail.seller} />
        <h3>{detail.title}</h3>
      </Link>
    </SaleItemWrapper>
  )
}

const SaleList = ({ list, error, loading, auth }) => {
  if (error) {
    return <SaleListWrapper>오류 발생!</SaleListWrapper>
  }
  if (loading || !list) {
    return <LinearProgressBar />
  }

  return (
    <SaleListWrapper>
      <SaleListButtonWrapper>
        {auth !== null && (
          <Button red to="/sale">
            판매 글 작성하기
          </Button>
        )}
      </SaleListButtonWrapper>
      <div>
        {list.map((detail) => (
          <SaleItem key={detail.id} detail={detail} />
        ))}
      </div>
    </SaleListWrapper>
  )
}

export default SaleList
