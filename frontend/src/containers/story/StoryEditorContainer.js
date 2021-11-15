import React, { useEffect, useCallback } from 'react'
import StoryEditor from '../../components/story/StoryEditor'
import { useSelector, useDispatch } from 'react-redux'
import { changeField, initialize } from '../../modules/story'

const StoryEditorContainer = () => {
  const dispatch = useDispatch()
  const { title, contents } = useSelector(({ story }) => ({
    title: story.title,
    contents: story.contents,
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
      contents={contents}
    />
  )
}

export default StoryEditorContainer
