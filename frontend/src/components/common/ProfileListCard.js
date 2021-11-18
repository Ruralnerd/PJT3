/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import palette from '../../lib/styles/palette'

const CardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  .container {
    width: 18rem;
    height: 20rem;
  }

  .card {
    width: 18rem;
    height: 18rem;
  }

  .slide {
    transition: 0.5s;
    border-radius: 0 0 10px 10px;
  }

  /* 사진 슬라이드 */
  .slide.slide1 {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 18rem;
    height: 18rem;
    z-index: 1;
    transition: 0.7s;
    transform: translateY(0);
  }

  .card:hover .slide.slide1 {
    transform: translateY(-3rem); // 사진 올라가는 높이

    img {
      border-radius: 0;
    }
  }

  /* 설명 슬라이드 */
  .slide.slide2 {
    width: 18rem;
    height: 10rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    transition: 0.8s;
    transform: translateY(-15rem); // 튀어나오는 높이
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
  }

  .card:hover .slide.slide2 {
    transform: translateY(-8rem);
  }

  .card .slide.slide2::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 4px;
    bottom: 15px;
    left: 50%;
    left: 50%;
  }
`

const ThumbnailBox = styled.div`
  position: relative;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 18rem;
  height: 12rem;
  border-radius: 10px 10px 0 0;

  img {
    position: absolute;
    top: 50%;
    left: 50%;
    object-fit: cover;
    transform: translate(-50%, -50%);
    font-size: 80px;
    color: #fff;
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
`

const CardInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const CardInfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  text-decoration: none;
  padding-top: 2rem;

  hr {
    width: 100%;
    border-top: 1px solid ${palette.gray[2]};
  }

  .nickname {
    font-size: 14px;
    margin-bottom: 10px;
  }

  img {
    border-radius: 100%;
    width: 2rem;
    height: 2rem;
    margin-right: 1rem;
  }

  .market-info {
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    div {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
  }
`

const ProfileListCard = ({ profile }) => {
  const { id, nickname, profile_img, markets } = profile
  return (
    <CardWrapper>
      <Link to={`/profile/${id}`}>
        <div className="container">
          <div className="card">
            <div className="slide slide1">
              <div className="content">
                <ThumbnailBox>
                  <img src={`${profile_img}`} alt="" />
                </ThumbnailBox>
              </div>
            </div>
            <div className="slide slide2">
              <CardInfo>
                <CardInfoText>
                  <div className="nickname">
                    안녕하세요, 농부 {nickname}입니다.
                  </div>
                  {markets.map((market) => (
                    <div className="market-info">
                      <img
                        src={`${market.thumbnail_img}`}
                        alt="thumbnail_img"
                      />
                      <div>{market.title}</div>
                    </div>
                  ))}
                </CardInfoText>
              </CardInfo>
            </div>
          </div>
        </div>
      </Link>
    </CardWrapper>
  )
}

export default ProfileListCard
