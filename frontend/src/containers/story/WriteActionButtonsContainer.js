import React, { useEffect } from 'react'
import WriteActionButtons from '../../components/story/WriteActionButtons'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { putStory } from '../../modules/story'

const WriteActionButtonsContainer = ({ history }) => {
  const dispatch = useDispatch()
  const { id, title, contents, categorys, post, postError } = useSelector(
    ({ story }) => ({
      id: story.id.id,
      title: story.title,
      contents: story.contents,
      categorys: story.categorys,
      post: story.post,
      postError: story.postError,
    }),
  )

  const onPublish = () => {
    dispatch(
      putStory({
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
      history.push('/story')
    }
    if (postError) {
      console.log(postError)
    }
  }, [history, post, postError])

  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />
}

export default withRouter(WriteActionButtonsContainer)
