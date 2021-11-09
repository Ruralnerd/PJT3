import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import SaleDetail from '../../components/market/SaleDetail'
import { getPost } from '../../modules/market'

const MarketDetail = ({ match, getPost, post, loadingPost }) => {
  useEffect(() => {
    getPost(match.params.id)
    return () => {
      getPost(1)
    }
  }, [getPost, match.params.id])

  return (
    <div>
      <SaleDetail post={post} loadingPost={loadingPost} />
    </div>
  )
}

export default connect(
  ({ market, loading }) => ({
    post: market.post,
    loadingPost: loading['market/GET_POST'],
  }),
  {
    getPost,
  },
)(MarketDetail)
