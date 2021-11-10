import EditorTemplate from '../components/editor/EditorTemplate'
import palette from '../lib/styles/palette'

const EditorPage = ({ match }) => {
  const { type, color } = match.params

  /* 에디터 테마 */
  const theme = {
    /* 템플릿 */
    WrapperBackground: palette.gray[0],
    /* 에디터 박스 */
  }

  // 다크 모드
  if (color === 'dark') {
    const theme = {
      WrapperBackground: palette.gray[9],
    }
    return <EditorTemplate type={type} theme={theme}></EditorTemplate>
  }

  return <EditorTemplate type={type} theme={theme}></EditorTemplate>
}

export default EditorPage
