import React, { useEffect } from 'react'
import WriteActionButtons from '../../components/write/WriteActionButtons'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { writePut } from '../../modules/write'

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch()
  const { id, title, contents, categorys, post, postError } = useSelector(
    ({ write }) => ({
      id: write.id.id,
      title: write.title,
      contents: write.contents,
      categorys: write.categorys,
      post: write.post,
      postError: write.postError,
    }),
  )

  const onPublish = () => {
    dispatch(
      writePut({
        id,
        title,
        contents,
        categorys,
      }),
    )
  }

  // 취소
  const onCancel = () => {
    history.goBack()
  }

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (post) {
      history.push('/')
    }
    if (postError) {
      console.log(postError)
    }
  }, [history, post, postError])

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />
}

export default withRouter(WriteActionButtonsContainer)
