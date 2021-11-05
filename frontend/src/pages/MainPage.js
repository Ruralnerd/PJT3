/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import { useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Slide from '../containers/Slide.js'

const Header = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  border: 2px solid red;
  font-size: 24px;
`
const CategoryText = css`
  display: flex;
  align-items: center;
  font-size: 20px;
  border: 2px solid orange;
`
const ProductList = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  height: 120px;
  border: 2px solid green;
`
const Product = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 2px solid purple;
`
const StoryList = css`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 20px;
  height: 120px;
  border: 2px solid green;
`
const StoryPicture = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid blue;
`
const StoryContent = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid orange;
`

function MainPage() {
  const a = useSelector((state) => state)
  return (
    <div className="App">
      <div css={[Header]}>메인페이지</div>
      <Slide />
      <div css={CategoryText}>떠오르는 상품</div>
      <div css={ProductList}>
        <div css={Product}>떠오르는 상품1</div>
        <div css={Product}>떠오르는 상품2</div>
        <div css={Product}>떠오르는 상품3</div>
      </div>

      <div css={CategoryText}>제철상품</div>
      <div css={ProductList}>
        <div css={Product}>제철상품1</div>
        <div css={Product}>제철상품2</div>
        <div css={Product}>제철상품3</div>
      </div>
      <div css={CategoryText}>농부 이야기</div>
      <div css={StoryList}>
        <div css={StoryPicture}>농부 이야기 사진</div>
        <div css={StoryContent}>농부 이야기 내용</div>
      </div>
      <div css={StoryList}>
        <div css={StoryPicture}>농부 이야기 사진</div>
        <div css={StoryContent}>농부 이야기 내용</div>
      </div>
      <div css={StoryList}>
        <div css={StoryPicture}>농부 이야기 사진</div>
        <div css={StoryContent}>농부 이야기 내용</div>
      </div>
      <div>님의 처참한 몸무게: {a}</div>
    </div>
  )
}

export default MainPage
