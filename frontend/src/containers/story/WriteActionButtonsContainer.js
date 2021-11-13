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

  // 포스트 등록
  // for (var value of contents.values()) {
  //   console.log(value)
  // }
  const onPublish = () => {
    dispatch(
      writePut(
        // 여기중괄호조심
        {
          id,
          title,
          contents,
          categorys,
        },
        // formData,
      ),
    )
  }

  // 취소
  const onCancel = () => {
    history.goBack()
  }

  // 성공 혹은 실패 시 할 작업
  useEffect(() => {
    if (post) {
      // const { _id, user } = post
      history.push('/')
      // history.push(`/@${user.username}/${_id}`)
    }
    if (postError) {
      console.log(postError)
    }
  }, [history, post, postError])

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />
}

export default withRouter(WriteActionButtonsContainer)
