import React from 'react'
import EditorContainer from '../containers/story/EditorContainer'
import TagBoxContainer from '../containers/story/TagBoxContainer'
import WriteActionButtonsContainer from '../containers/story/WriteActionButtonsContainer'
import StoryTemplate from '../components/write/StoryTemplate'

const StoryEditorPage = () => {
  return (
    <StoryTemplate>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </StoryTemplate>
  )
}

export default StoryEditorPage
