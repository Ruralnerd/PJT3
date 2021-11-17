/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`

const CardBody = styled.div``

const CardImage = styled.img`
  width: 100%;
  border: 1px solid ${palette.gray[2]};
  border-radius: 8px;
`

const CardMoreView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
  padding: 5%;
  color: #fdf4ff;
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  border-radius: 8px;

  img {
    width: 100%;
  }

  ${({ type }) =>
    type === 'popular' &&
    `
    background: #f4bb5f;
  `}

  ${({ type }) =>
    type === 'manyorder' &&
    `
    background: #5197f2;
  `}

  ${({ type }) =>
    type === 'story' &&
    `
    background: #c9bc99;
  `}
`

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;

  .title {
    height: 40px;
    font-size: 14px;
    font-weight: bold;
  }

  .price-original {
    color: #c3b2b2;
    font-size: 14px;
    text-decoration: line-through;
  }

  .price {
    font-size: 16px;
    font-weight: bold;
  }

  hr {
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
  }

  .seller-info {
    display: flex;
    justify-content: flex-end;
    height: 20px;
    font-size: 14px;
  }
`

const Card = ({ item, type }) => {
  const textCvt = (type) => {
    if (type === 'popular') return '베스트셀러'
    if (type === 'manyorder') return '인기상품'
    if (type === 'story') return '스토리'
  }
  if (!item) {
    return (
      <CardWrapper>
        <CardMoreView popular type={type}>
          <img
            src={`/images/icon/card_more_${type}.PNG`}
            alt={`${textCvt(type)} 더보기`}
          />
          <pre></pre>
          <Link to="/market">{`${textCvt(type)} 더보기`}</Link>
        </CardMoreView>
      </CardWrapper>
    )
  }
  const { id, thumbnail_img, title, seller, price } = item

  const wonCommaReg = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  const farmerName = (nickname) => {
    return (
      <div>
        <Link to={`/profile/${seller.id}`}>
          <b>{nickname}</b> 농부님
        </Link>
      </div>
    )
  }
  return (
    <CardWrapper>
      <CardBody>
        <Link to={`/market/${id}`}>
          <CardImage src={thumbnail_img} />
        </Link>
        <CardInfo>
          <Link to={`/market/${id}`}>
            <div className="title">{title}</div>
            <div className="price-original">{wonCommaReg(price * 1.2)}원</div>
            <div className="price">{wonCommaReg(price)}원</div>
          </Link>
          <hr />
          <div className="seller-info">{farmerName(seller.nickname)}</div>
        </CardInfo>
      </CardBody>
    </CardWrapper>
  )
}

export default Card
