/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import palette from '../../lib/styles/palette'

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;

  transition: transform 500ms;

  &:hover {
    transform: scale(1.05);
    z-index: 1;
  }
`

const CardBody = css``

const CardContent = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  overflow: hidden;

  @media screen and (max-width: 1800px) {
    width: 450px;
    height: 450px;
  }

  @media screen and (max-width: 1440px) {
    width: 400px;
    height: 400px;
  }

  @media screen and (max-width: 1048px) {
    width: 350px;
    height: 350px;
  }

  @media screen and (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 1px solid ${palette.gray[2]};
  border-radius: 8px;
`

const CardBanner = styled.div`
  position: absolute;
  bottom: -5%;
  left: 50%;
  width: 95%;
  height: 72px;
  padding: 4px 16px;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
  background: #3e3e3e;
  opacity: 90%;
  border-radius: 8px;
  color: white;
  font-size: 12px;
  font-weight: 400;

  .CardBanner-image {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0;

    img {
      width: 50px;
      height: 50px;
    }
  }

  .CardBanner-text {
    width: 100%;
    display: flex;
    text-align: left;
    flex-direction: column;
    justify-content: center;
    padding-left: 10px;

    b {
      font-size: 13px;
    }
  }
`

const CardMoreView = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
  color: #fdf4ff;
  font-size: 14px;
  font-weight: bold;
  text-decoration: underline;
  border-radius: 8px;

  img {
    height: auto;
    max-height: 150px;
  }

  ${({ type }) =>
    type === 'story' &&
    `
    background: #c9bc99;
  `}
`

const SquareCard = ({ story, type }) => {
  const textCvt = (type) => {
    if (type === 'story') return '스토리'
  }

  if (!story) {
    return (
      <CardWrapper>
        <CardContent>
          <CardMoreView popular type={type}>
            <img
              src={`/images/icon/card_more_${type}.PNG`}
              alt={`${textCvt(type)} 더보기`}
            />
            <pre></pre>
            {`${textCvt(type)} 더보기`}
          </CardMoreView>
        </CardContent>
      </CardWrapper>
    )
  }
  const { id, thumbnail_img, title, producer } = story
  const { nickname, profile_img } = producer

  return (
    <CardWrapper>
      <Link to={`/story/${id}`} css={CardBody}>
        <CardContent>
          <CardImage src={thumbnail_img} />
          <CardBanner>
            <div className="CardBanner-image">
              <img src={`${profile_img}`} alt="" />
            </div>
            <div className="CardBanner-text">
              <b>{nickname}</b>
              {title}
            </div>
          </CardBanner>
        </CardContent>
      </Link>
    </CardWrapper>
  )
}

export default SquareCard
