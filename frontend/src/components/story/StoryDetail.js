/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useDispatch } from 'react-redux'
import { deleteStory } from '../../modules/story'
import { withRouter } from 'react-router'

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'gray' }}
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
      style={{ ...style, display: 'block', background: 'gray' }}
      css={css`
        margin-left: 9%;
        z-index: 9999;
      `}
      onClick={onClick}
    />
  )
}

const StoryDetail = ({ story, history }) => {
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

  const CarouselStyle = css`
    .slick-list {
      margin: 0 0;
    }

    .slick-slide div {
      cursor: pointer;
    }

    .slick-dots {
      position: absolute;
      bottom: 100%;
      background-color: gray;
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
  `

  const CarouselImage = css`
    width: 100%;
    height: 100%;
    object-fit: fill;
    text-decoration: none;
  `
  const HeaderWrapper = css`
    margin-bottom: 10%;
  `
  const dispatch = useDispatch()

  const onDeleteStory = () => {
    dispatch(deleteStory(story.id))
    setTimeout(() => {
      history.replace('/story/')
    }, 1000)
  }

  return (
    <div>
      <button onClick={onDeleteStory}>체크</button>
      {story && (
        <div>
          <div css={HeaderWrapper}>
            <p>제목 : {story.title}</p>
            <p>작성자 : {story.producer.nickname}</p>
          </div>
          <div>
            <Slider css={CarouselStyle} {...settings}>
              {story.contents.map((page) => (
                <div key={page.id} css={CarouselItem}>
                  <img css={CarouselImage} src={page.img} alt=""></img>
                  <p>{page.content}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  )
}

export default withRouter(StoryDetail)
