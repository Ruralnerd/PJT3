import React, { useEffect, useCallback } from 'react'
import StoryEditor from '../../components/story/StoryEditor'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, initialize } from '../../modules/write'

const EditorContainer = () => {
  const dispatch = useDispatch()
  const { title, img, content } = useSelector(({ write }) => ({
    title: write.title,
    img: write.img,
    content: write.content,
  }))

  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  )

  // 언마운트될 때 초기화
  useEffect(() => {
    return () => {
      dispatch(initialize())
    }
  }, [dispatch])

  return (
    <StoryEditor
      onChangeField={onChangeField}
      title={title}
      img={img}
      content={content}
    />
  )
}

export default EditorContainer
