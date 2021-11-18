/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import palette from '../../lib/styles/palette'

const CarouselWrapper = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`

const CarouselInfo = styled.div`
  display: flex;
  width: 100%;
`

const CarouselHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 24px 0;

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }
`

const CarouselBody = styled.div`
  position: relative;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.025);
  width: 40%;
  border: 1px solid ${palette.gray[3]};

  @media screen and (max-width: 1800px) {
    width: 50%;
  }

  @media screen and (max-width: 1024px) {
    width: 70%;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`

const CarouselBadge = styled.div`
  position: absolute;
  text-align: center;
  top: 10px;
  left: 10px;
  border-radius: 4px;
  padding: 4px;
  width: 5rem;
  background: #d33939;
  color: white;
  font-size: 1rem;
  z-index: 9;
`

const CarouselItem = css`
  text-align: center;
  font-size: 16px;

  div {
    color: white;
    padding: 8px;
  }
`

const CarouselStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: #3e3e3e;

  .slick-list {
    margin: 0 0;
  }

  .slick-slide {
    cursor: pointer;
  }

  .slick-dots {
    position: absolute;
    bottom: 40px;
    width: 33%;

    li {
      margin: 0;
    }
  }

  .slick-track {
    display: relative;
  }
`

const CarouselItemImage = css`
  width: 100%;
  height: 100%;
  flex: 1;
  object-fit: cover;
`

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'none' }}
      css={css`
        margin-right: 9%;
        z-index: 9999;
      `}
      onClick={onClick}
    />
  )
}

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'none' }}
      css={css`
        margin-left: 9%;
        z-index: 9999;
      `}
      onClick={onClick}
    />
  )
}

const CarouselList = ({ carouselItems, loading }) => {
  const settings = {
    dots: true, // 캐러셀의 점
    infinite: true, // 마지막 장 다음에 첫번째(로테이션)
    speed: 1000, // 넘어가는 속도는 몇으로 할 것인지
    slidesToShow: 1, // 한 페이지에 몇 장 보여줄 것인지
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  if (loading || !carouselItems) {
    return null
  }

  return (
    <div css={CarouselWrapper}>
      <CarouselInfo>
        <CarouselHeader>가장 많이 팔리고 있어요</CarouselHeader>
      </CarouselInfo>
      <CarouselBody>
        <CarouselBadge>매진임박</CarouselBadge>
        <Slider css={CarouselStyle} carouselItems={carouselItems} {...settings}>
          {carouselItems.map((item) => (
            <Link key={item.id} to={`/market/${item.id}`} css={CarouselItem}>
              <img
                css={CarouselItemImage}
                alt="CarouselItemImage"
                src={item.thumbnail_img}
              />
              <div>{item.title}</div>
            </Link>
          ))}
        </Slider>
      </CarouselBody>
    </div>
  )
}

export default CarouselList
