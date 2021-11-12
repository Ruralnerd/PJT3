import React, { useEffect } from 'react'
import WriteActionButtons from '../../components/write/WriteActionButtons'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { writePost } from '../../modules/write'

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch()
  const { title, img, content, categorys, post, postError } = useSelector(
    ({ write }) => ({
      title: write.title,
      img: write.img,
      content: write.content,
      categorys: write.categorys,
      post: write.post,
      postError: write.postError,
    }),
  )

  // 포스트 등록
  const onPublish = () => {
    dispatch(
      writePost({
        title,
        img,
        content,
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
