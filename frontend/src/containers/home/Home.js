import React from 'react'
import SlideList from '../../components/home/SlideList'
import HotProductList from '../../components/home/HotProductList'
import SeasonalProductList from '../../components/home/SeasonalProductList'
import FarmerStoryList from '../../components/home/FarmerStoryList'

const Home = ({ posts }) => {
  // useEffect(() => {
  //   getPosts()
  //   return () => {
  //     // unMount
  //   }
  // }, [getPosts])
  return (
    <div>
      <SlideList posts={posts} />
      <HotProductList posts={posts} />
      <SeasonalProductList posts={posts} />
      <FarmerStoryList />
    </div>
  )
}
export default Home
