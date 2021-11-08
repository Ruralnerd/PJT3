import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import SlideList from '../../components/home/SlideList'
import HotProductList from '../../components/home/HotProductList'
import SeasonalProductList from '../../components/home/SeasonalProductList'
import FarmerStoryList from '../../components/home/FarmerStoryList'
import { getPosts } from '../../modules/home'

const Home = ({ getPosts, posts }) => {
  useEffect(() => {
    getPosts()
    return () => {
      // unMount
    }
  }, [getPosts])
  return (
    <div>
      <SlideList posts={posts} />
      <HotProductList />
      <SeasonalProductList />
      <FarmerStoryList />
    </div>
  )
}
export default connect(
  ({ home }) => ({
    posts: home.posts,
  }),
  {
    getPosts,
  },
)(Home)
