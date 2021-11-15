import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import palette from '../../lib/styles/palette'

const SubInfoWrapper = styled.div`
  ${(props) =>
    props.hasMarginTop &&
    css`
      margin-top: 1rem;
    `}

  div {
    font-size: 12px;
    color: ${palette.gray[5]};
  }

  b {
    color: ${palette.cyan[7]};
  }

  color: ${palette.gray[6]};

  span + span:before {
    color: ${palette.gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7';
  }
`
const SubInfo = ({ seller, hasMarginTop, detail }) => {
  return (
    <SubInfoWrapper hasMarginTop={hasMarginTop}>
      {seller && (
        <span>
          작성자:
          <b>
            <Link to={`/accounts/users/${seller.id}`}> {seller.nickname}</Link>
          </b>
        </span>
      )}
      {detail && (
        <span>
          <div>
            가격: 1{detail.unit}당 {detail.price}원
          </div>
          <div>판매기간: {new Date(detail.period).toTimeString()}까지</div>
          <div>
            수량: 총 {detail.quantity}
            {detail.unit}
          </div>
          <div>작성: {new Date(detail.created_at).toLocaleDateString()}</div>
          <div>수정: {new Date(detail.updated_at).toLocaleDateString()}</div>
          <div>조회: {detail.hits}</div>
        </span>
      )}
    </SubInfoWrapper>
  )
}

export default SubInfo
