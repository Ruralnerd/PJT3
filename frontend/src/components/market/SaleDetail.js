const SaleDetail = ({ loadingPost, post }) => {
  return (
    <div>
      <section>
        <h1>여기가 물건 상세 보여주는곳</h1>
        {loadingPost && '로딩 중...'}
        {!loadingPost && post && (
          <div>
            <h3>{post.title}</h3>
            <h3>{post.body}</h3>
          </div>
        )}
      </section>
    </div>
  )
}

export default SaleDetail
