import React from 'react'
import EditorContainer from '../containers/story/EditorContainer'
import TagBoxContainer from '../containers/story/TagBoxContainer'
import WriteActionButtonsContainer from '../containers/story/WriteActionButtonsContainer'
import StoryEditorTemplate from '../components/write/StoryEditorTemplate'

const StoryEditorPage = () => {
  return (
    <StoryEditorTemplate>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </StoryEditorTemplate>
  )
}

export default StoryEditorPage
