/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const CarouselWrapper = css``

const CarouselStyle = css`
  .slick-list {
    margin: 0 0;
  }

  .slick-slide div {
    cursor: pointer;
  }

  .slick-dots {
    margin: 10% 0;
  }

  .slick-track {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const CarouselItem = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
`

const CarouselImage = css`
  width: 100%;
  height: 20%;
  object-fit: fill;
  text-decoration: none;
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

const CarouselList = ({ carouselItems }) => {
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

  return (
    <div css={CarouselWrapper}>
      {carouselItems && (
        <Slider css={CarouselStyle} carouselItems={carouselItems} {...settings}>
          {carouselItems.map((item) => (
            <Link key={item.id} to={`/market/${item.id}`}>
              <div css={CarouselItem}>
                <img
                  css={CarouselImage}
                  alt="CarouselImage"
                  src={item.thumbnail_img}
                />
              </div>
            </Link>
          ))}
        </Slider>
      )}
    </div>
  )
}

export default CarouselList
