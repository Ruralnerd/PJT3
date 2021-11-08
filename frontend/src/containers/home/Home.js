import React from 'react'
import SlideList from '../../components/home/SlideList'
import HotProductList from '../../components/home/HotProductList'
import SeasonalProductList from '../../components/home/SeasonalProductList'
import FarmerStoryList from '../../components/home/FarmerStoryList'

const Home = () => {
  return (
    <div>
      <SlideList />
      <HotProductList />
      <SeasonalProductList />
      <FarmerStoryList />
    </div>
  )
}
export default Home
