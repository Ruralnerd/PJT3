import React from 'react'
import StoryEditorContainer from '../../containers/story/StoryEditorContainer'
import CategoryBoxContainer from '../../containers/story/CategoryBoxContainer'
import WriteActionButtonsContainer from '../../containers/story/WriteActionButtonsContainer'
import StoryEditorTemplate from '../../components/story/StoryEditorTemplate'

const StoryEditorPage = () => {
  return (
    <StoryEditorTemplate>
      <StoryEditorContainer />
      <CategoryBoxContainer />
      <WriteActionButtonsContainer />
    </StoryEditorTemplate>
  )
}

export default StoryEditorPage
