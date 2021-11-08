import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import SaleList from '../../components/market/SaleList'
import { getPosts } from '../../modules/market'

const Market = ({ getPosts, posts, loadingPosts }) => {
  useEffect(() => {
    getPosts()
    return () => {
      // unMount
    }
  }, [getPosts])

  return (
    <div>
      <SaleList posts={posts} loadingPosts={loadingPosts} />
    </div>
  )
}

export default connect(
  ({ market, loading }) => ({
    posts: market.posts,
    loadingPosts: loading['market/GET_POST'],
  }),
  {
    getPosts,
  },
)(Market)
